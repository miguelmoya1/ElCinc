import { Controller, Get, Headers } from '@nestjs/common';
import { auth } from '../auth/auth';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  public async getClient(@Headers('authorization') token: string) {
    const client = auth.decode(token);
    return this.clientService.getAllClients();
  }
}
