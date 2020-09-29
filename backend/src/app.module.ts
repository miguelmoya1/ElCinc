import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { Routes, RouterModule } from 'nest-router';

const routes: Routes = [{
  path: 'user',
  module: UserModule,
}, {
  path: 'auth',
  module: AuthModule,
},];
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    UserModule,
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(cosumer: MiddlewareConsumer) {
    cosumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
