import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Get()
  getCart(@CurrentUser() user: any) {
    return this.cartService.getOrCreateCart(user.sub);
  }

  @UseGuards(JwtGuard)
  @Post('items')
  addToCart(@Body() dto: AddToCartDto, @CurrentUser() user: any) {
    return this.cartService.addToCart(dto, user.sub);
  }

  @UseGuards(JwtGuard)
  @Patch('items/:productId')
  updateCartItem(@Param('productId') productId: string, @Body() dto: UpdateCartItemDto, @CurrentUser() user: any) {
    return this.cartService.updateCartItem(productId, dto, user.sub);
  }

  @UseGuards(JwtGuard)
  @Delete('items/:productId')
  removeFromCart(@Param('productId') productId: string, @CurrentUser() user: any) {
    return this.cartService.removeFromCart(productId, user.sub);
  }

  @UseGuards(JwtGuard)
  @Delete()
  clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.sub);
  }
}