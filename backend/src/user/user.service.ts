import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { IUser } from 'club-del-bonsai';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  async get(): Promise<User[]>;
  async get(id: string): Promise<User>;
  async get(id?: string) {
    if (id) {
      return await User.findOne({ where: { id }, attributes: { exclude: ['password', 'deletedAt'] } });
    } else {
      return await User.findAll({ attributes: { exclude: ['password', 'deletedAt'] } });
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

  async delete(id: string) {
    return await User.destroy({ where: { id } });
  }
}
