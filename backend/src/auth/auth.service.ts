import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IClient, IUser } from '../../../global';
import { JWT_SECRET, JWT_EXPIRES, JWT_ISSUER } from '../shared/secret';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  public encode(user: IUser | IClient) {
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
