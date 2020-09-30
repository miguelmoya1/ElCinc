import { Controller, Post, Body, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { auth } from './auth';
import { IUser } from '../../../global';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: IUser) {
    if (!body.email || !body.password) throw new HttpException('Email y contraseña son requeridos', HttpStatus.NOT_ACCEPTABLE);
    return { token: await this.authService.login(body) };
  }

  @Get('token')
  token(@Headers('authorization') authorization: string) {
    if (auth.decode(authorization)) return { ok: true };
  }

  @Post('register')
  async register(@Body() body: IUser) {
    return { token: await this.authService.register(body) };
  }

  @Get('rehydrate')
  async rehydrate(@Headers('authorization') authorization: string) {
    return { token: await this.authService.rehydrate(authorization) };
  }
}
