import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as fs from 'fs';
import { PROD, ROUTE_PRIVKEY, ROUTE_CERT, MAX_SIZE_JSON } from './app.constants';
import * as bodyParser from 'body-parser';
import { db } from './db';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  try {
    await db.init();
  } catch (e) {
    console.log(e);
    console.error('NO SE HA PODIDO CONECTAR LA BASE DE DATOS :(');
  }

  let app: INestApplication;
  try {
    const keyFile = !PROD || fs.readFileSync(ROUTE_PRIVKEY);
    const certFile = !PROD || fs.readFileSync(ROUTE_CERT);
    app = PROD
      ? await NestFactory.create(AppModule, {
          httpsOptions: {
            key: keyFile,
            cert: certFile,
          },
        })
      : await NestFactory.create(AppModule);
  } catch (e) {
    app = await NestFactory.create(AppModule);
  }
  app.use(bodyParser.json({ limit: MAX_SIZE_JSON }));
  app.use(bodyParser.urlencoded({ limit: MAX_SIZE_JSON, extended: true }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
