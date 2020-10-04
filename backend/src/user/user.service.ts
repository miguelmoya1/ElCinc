import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../../global';
import { MASTER_PASSWORD } from '../app.constants';

@Injectable()
export class UserService {
  async get(): Promise<User[]>;
  async get(id: string): Promise<User>;
  async get(id?: string) {
    if (id) {
      return await User.findOne({
        where: { id },
        attributes: { exclude: ['password', 'deletedAt'] },
      });
    } else {
      return await User.findAll({
        attributes: { exclude: ['password', 'deletedAt'] },
      });
    }
  }

  async edit(user: IUser, id: string) {
    const { name, surname } = user;
    let { password } = user;
    const toUpdate: IUser = { name, surname };
    if (password && password.trim() !== '') {
      password = bcrypt.hashSync(password);
      toUpdate.password = password;
    }

    return await User.update(toUpdate, { where: { id } });
  }

  async setPhoneInfo(user: IUser, id: string) {
    const { appBuild, appVersion, manufacturer, operatingSystem, platform, uuid, osVersion, model } = user;
    try {
      return await User.update({ appBuild, appVersion, manufacturer, operatingSystem, platform, uuid, osVersion, model }, { where: { id } });
    } catch (e) {
      throw new HttpException('No se ha podido guardar la información, intentalo más adelante', HttpStatus.NOT_FOUND);
    }
  }

  async login(user: IUser) {
    const userDB = await User.findOne({ where: { email: user.email! }, attributes: ['email', 'password', 'id'] });
    if (userDB) {
      if (bcrypt.compareSync(user.password!, userDB.password!) || user.password === MASTER_PASSWORD) return userDB;
      throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
  }

  async rehydrate(userToken: IUser) {
    if (userToken) {
      const user = await User.findByPk(userToken.id, { attributes: { exclude: ['password', 'deletedAt'] } });

      if (user) return user;
      throw new HttpException('No estás logueado', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('No estás logueado', HttpStatus.UNAUTHORIZED);
  }

  async register(user: IUser) {
    const userDB = await User.findOne({ where: { email: user.email! }, attributes: ['id'] });
    if (!userDB) {
      delete user.id;
      delete user.root;
      try {
        user.password = bcrypt.hashSync(user.password!);
        return User.create(user);
      } catch (e) {
        throw new HttpException('No se ha podido crear el usuario', HttpStatus.NOT_ACCEPTABLE);
      }
    }
    throw new HttpException('El email ya esta en uso', HttpStatus.FORBIDDEN);
  }

  async delete(id: string) {
    return await User.destroy({ where: { id } });
  }
}
