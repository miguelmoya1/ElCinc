import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService, private authService: AuthService) {}

  @Get('/')
  public async getClient(@Headers('authorization') token: string) {
    // this.authService.decode(token);
    return this.clientService.getAllClients();
  }
}
