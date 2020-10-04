import { Module } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [UserService, AuthService, ClientService],
})
export class AuthModule {}
