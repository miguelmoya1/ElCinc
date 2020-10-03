import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JWT_SECRET, JWT_EXPIRES, JWT_ISSUER } from '../app.constants';
import { IClient, IUser } from '../../../global';

class Auth {
  encode(user: IUser | IClient) {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES, issuer: JWT_ISSUER });
  }

  decode(token: string) {
    try {
      token = token.replace('Bearer ', '');
      const tokenVerify = jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER }) as IUser | IClient;
      if (!tokenVerify) throw new HttpException('Sesión expirada, entra de nuevo', HttpStatus.UNAUTHORIZED);
      return tokenVerify;
    } catch (e) {
      throw new HttpException('Sesión expirada, entra de nuevo', HttpStatus.UNAUTHORIZED);
    }
  }
}

const auth = new Auth();

export { auth };
