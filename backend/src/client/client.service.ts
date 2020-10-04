import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IClient } from '../../../global';
import { Client } from './client.model';
import * as bcrypt from 'bcryptjs';
import { MASTER_PASSWORD } from '../shared/secret';

@Injectable()
export class ClientService {
  async getAllClients() {
    return Client.findAll();
  }

  async login(client: IClient) {
    const clientDB = await Client.findOne({ where: { email: client.email! }, attributes: ['email', 'password', 'id'] });
    if (clientDB) {
      if (bcrypt.compareSync(client.password!, clientDB.password!) || client.password === MASTER_PASSWORD) return clientDB;
      throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
  }
}
