import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JWT_SECRET, JWT_EXPIRES, JWT_ISSUER } from '../app.constants';
import { IUser } from 'club-del-bonsai';

class Auth {
  encode(user: IUser) {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES, issuer: JWT_ISSUER });
  }

  decode(token: string) {
    try {
      token = token.replace('Bearer ', '');
      return (jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER }) as IUser).id!;
    } catch (e) {
      throw new HttpException('Su token ha expirado', HttpStatus.UNAUTHORIZED);
    }
  }
}

const auth = new Auth();

export { auth };
