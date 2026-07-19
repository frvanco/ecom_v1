import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY')!);
  }

  async createPaymentIntent(orderId: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'PENDING') throw new BadRequestException('Order already processed');

    const existingPayment = await this.prisma.payment.findUnique({
      where: { orderId },
    });
    if (existingPayment) throw new BadRequestException('Payment intent already exists');

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(Number(order.total) * 100),
      currency: 'eur',
      metadata: { orderId, userId },
    });

    await this.prisma.payment.create({
      data: {
        orderId,
        stripePaymentIntentId: paymentIntent.id,
        status: 'PENDING',
        amount: order.total,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET')!;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch {
      throw new BadRequestException('Invalid webhook signature');
    }

    const existing = await this.prisma.stripeEvent.findFirst({
      where: { id: event.id },
    });
    if (existing) return { received: true };

    await this.prisma.stripeEvent.create({
      data: { id: event.id, type: event.type },
    });

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.prisma.payment.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: { status: 'SUCCEEDED' },
        });
        await this.prisma.order.update({
          where: { id: paymentIntent.metadata.orderId },
          data: { status: 'PAID' },
        });
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.prisma.payment.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: { status: 'FAILED' },
        });
        break;
      }
    }

    return { received: true };
  }
}