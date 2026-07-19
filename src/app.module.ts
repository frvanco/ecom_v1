import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
=======
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
>>>>>>> feat/backend-1

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
<<<<<<< HEAD
=======
    CatalogModule,
    CartModule,
    OrdersModule,
    PaymentModule,
>>>>>>> feat/backend-1
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}