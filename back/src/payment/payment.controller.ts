import * as common from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@common.Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @common.UseGuards(JwtGuard)
  @common.Post('create-intent')
  createPaymentIntent(@common.Body() dto: CreatePaymentIntentDto, @CurrentUser() user: any) {
    return this.paymentService.createPaymentIntent(dto.orderId, user.sub);
  }

  @common.Post('webhook')
  handleWebhook(
    @common.Headers('stripe-signature') signature: string,
    @common.Req() req: common.RawBodyRequest<Request>,
  ) {
    return this.paymentService.handleWebhook(req.rawBody!, signature);
  }
}