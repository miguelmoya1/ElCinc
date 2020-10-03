import { Injectable } from '@nestjs/common';
import { Client } from './client.model';

@Injectable()
export class ClientService {
  public getAllClients() {
    return Client.findAll();
  }
}
