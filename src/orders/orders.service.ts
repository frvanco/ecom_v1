import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    const cart = await this.cartService.getOrCreateCart(userId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + Number(item.unitPriceSnapshot) * item.quantity,
      0,
    );

    const shippingCost = 0;
    const tax = 0;
    const total = subtotal + shippingCost + tax;

    const order = await this.prisma.order.create({
      data: {
        userId,
        subtotal,
        shippingCost,
        tax,
        total,
        shippingName: dto.shippingName,
        shippingLine1: dto.shippingLine1,
        shippingLine2: dto.shippingLine2,
        shippingCity: dto.shippingCity,
        shippingZip: dto.shippingZip,
        shippingCountry: dto.shippingCountry,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPriceSnapshot,
          })),
        },
      },
      include: { items: { include: { product: true } }, payment: true },
    });

    await this.cartService.clearCart(userId);

    return order;
  }

  async findUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } }, payment: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOrderById(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: { include: { product: true } }, payment: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}