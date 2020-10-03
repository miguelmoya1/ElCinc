import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  public async getClient() {
    return this.clientService.getAllClients();
  }
}
