import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Request as NestRequest,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginUser(loginDto);
  }

  @Get('getUser')
  @UseGuards(AuthGuard)
  async getUser(
    @NestRequest() request: Request & { user?: { id: string } },
  ): Promise<User | null> {
    const userId = request.user?.id;
    if (!userId) return null;
    return await this.authService.getUser(userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('test')
  getTest(): { message: string } {
    return {
      message: 'Test Role guard berhasil',
    };
  }
}
