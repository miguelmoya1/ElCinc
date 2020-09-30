import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { MASTER_PASSWORD } from '../app.constants';
import { auth } from './auth';
import { User } from '../user/user.model';
import { IUser } from '../../../global';

@Injectable()
export class AuthService {
  async login(user: IUser) {
    const userDB = await User.findOne({ where: { email: user.email! }, attributes: ['email', 'password', 'id'] });
    if (userDB) {
      if (bcrypt.compareSync(user.password!, userDB.password!) || user.password === MASTER_PASSWORD) return auth.encode(userDB);
      throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
  }

  async register(user: IUser) {
    const userDB = await User.findOne({ where: { email: user.email! }, attributes: ['id'] });
    if (!userDB) {
      delete user.id;
      delete user.root;
      try {
        user.password = bcrypt.hashSync(user.password!);
        const userToReturn = await User.create(user);
        return auth.encode(userToReturn);
      } catch (e) {
        throw new HttpException('No se ha podido crear el usuario', HttpStatus.NOT_ACCEPTABLE);
      }
    }
    throw new HttpException('El email ya esta en uso', HttpStatus.FORBIDDEN);
  }

  async rehydrate(token: string) {
    const id = auth.decode(token);
    if (id) {
      const user = await User.findByPk(id, { attributes: { exclude: ['password', 'deletedAt'] } });

      if (user) return auth.encode(user);
      throw new HttpException('No estás logueado', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('No estás logueado', HttpStatus.UNAUTHORIZED);
  }
}
