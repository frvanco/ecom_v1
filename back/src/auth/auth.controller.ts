<<<<<<< HEAD
=======
import { IsEmail, IsString, MinLength } from 'class-validator';
>>>>>>> feat/backend-1
import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { CurrentUser } from './decorators/current-user.decorator';

class RegisterDto {
<<<<<<< HEAD
  email: string;
=======
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
>>>>>>> feat/backend-1
  password: string;
}

class LoginDto {
<<<<<<< HEAD
  email: string;
=======
  @IsEmail()
  email: string;

  @IsString()
>>>>>>> feat/backend-1
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return user;
  }
}