import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, AuthService],
})
export class ClientModule {}
