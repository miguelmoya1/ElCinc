import { Controller, Get, HttpException, HttpStatus, Headers, Put, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { auth } from '../auth/auth';
import { IUser } from '../../../global';

@Controller()
export class UserController {
  constructor(protected userService: UserService) { }

  @Get('/')
  async getUserLogged(@Headers('authorization') token: string) {
    const id = auth.decode(token);
    const user = await this.userService.get(id);

    if (user) {
      return user;
    }
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Get('/all')
  async getAllUsers(@Headers('authorization') token: string) {
    const id = auth.decode(token);
    const user = await this.userService.get(id);
    if (user.root) {
      return await this.userService.get();
    }
    throw new HttpException('No tienes permisos para ver estos datos', HttpStatus.UNAUTHORIZED);
  }

  @Put('/')
  async update(@Headers('authorization') token: string, @Body() user: IUser) {
    const id = auth.decode(token);
    const userLogged = await this.userService.get(id);

    if (userLogged) {
      return this.userService.edit(user, id);
    }
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Put('/phoneInfo')
  async setPhoneInfo(@Headers('authorization') token: string, @Body() user: IUser) {
    const id = auth.decode(token);
    return this.userService.setPhoneInfo(user, id);
  }

  @Put('/admin')
  async updateAdmin(@Headers('authorization') token: string, @Body() user: IUser) {
    const id = auth.decode(token);
    const userLogged = await this.userService.get(id);

    if (userLogged && userLogged.root) {
      return this.userService.edit(user, user.id!);
    }
    throw new HttpException('No tienes permisos para ver estos datos', HttpStatus.UNAUTHORIZED);
  }

  @Get('/:id')
  async getUser(@Headers('authorization') token: string, @Param('id') id: string) {
    const idLogged = auth.decode(token);
    const user = await this.userService.get(idLogged);

    if (user && user.root) {
      return await this.userService.get(id);
    }
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Delete('/:id')
  async delete(@Headers('authorization') token: string, @Param('id') id: string) {
    const idLogged = auth.decode(token);
    const user = await this.userService.get(idLogged);
    if (user.root) {
      return await this.userService.delete(id);
    }
    throw new HttpException('No tienes permisos para ver estos datos', HttpStatus.UNAUTHORIZED);
  }
}
