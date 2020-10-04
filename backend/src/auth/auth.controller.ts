import { Controller, Post, Body, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IClient, IUser } from '../../../global';
import { UserService } from '../user/user.service';
import { ClientService } from '../client/client.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private clientService: ClientService) {}

  @Post('login')
  async login(@Body() body: IUser) {
    if (!body.email || !body.password) throw new HttpException('Email y contraseña son requeridos', HttpStatus.NOT_ACCEPTABLE);
    return { token: this.authService.encode(await this.userService.login(body)) };
  }

  @Post('login/client')
  async loginClient(@Body() body: IClient) {
    if (!body.email || !body.password) throw new HttpException('Email y contraseña son requeridos', HttpStatus.NOT_ACCEPTABLE);
    return { token: this.authService.encode(await this.clientService.login(body)) };
  }

  @Get('token')
  token(@Headers('authorization') authorization: string) {
    if (this.authService.decode(authorization)) return true;
  }

  @Post('register')
  async register(@Body() body: IUser) {
    return { token: this.authService.encode(await this.userService.register(body)) };
  }

  @Get('rehydrate')
  async rehydrate(@Headers('authorization') authorization: string) {
    const user = this.authService.decode(authorization);
    return { token: this.authService.encode(await this.userService.rehydrate(user)) };
  }
}
