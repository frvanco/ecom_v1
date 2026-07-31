import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto, @CurrentUser() user: any) {
    return this.ordersService.createOrder(user.sub, dto);
  }

  @Get()
  findUserOrders(@CurrentUser() user: any) {
    return this.ordersService.findUserOrders(user.sub);
  }

  @Get(':id')
  findOrderById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.findOrderById(id, user.sub);
  }
}