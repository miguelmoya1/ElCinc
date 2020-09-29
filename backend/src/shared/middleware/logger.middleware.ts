import { Injectable, NestMiddleware } from '@nestjs/common';
import { PROD } from '../../app.constants';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!PROD) {
      console.log(`${moment().format('HH:mm:ss')} [${req.method}]: ${req.baseUrl}`);
    }
    next();
  }
}
