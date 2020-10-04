import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { ClientModule } from './client/client.module';
import { EventModule } from './event/event.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UserModule, AuthModule, ClientModule, EventModule],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(cosumer: MiddlewareConsumer) {
    cosumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
