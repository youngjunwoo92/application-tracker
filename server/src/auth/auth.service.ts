import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

import { HASH_ROUNDS, JWT_SECRET } from './const/auth.const';

type TokenType = 'access' | 'refresh';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  extractTokenFromHeader(
    authorizationHeader: string,
    type: 'Basic' | 'Bearer',
  ) {
    const splitToken = authorizationHeader.split(' ');

    if (splitToken.length !== 2 || splitToken[0] !== type) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = splitToken[1];

    return token;
  }

  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');
    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('Invalid Token');
    }

    const [email, password] = split;

    return { email, password };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });
  }

  rotateToken(token: string, type: TokenType) {
    const decoded = this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });

    if (decoded.type !== 'refresh')
      throw new UnauthorizedException(
        'Token can only be renewed with Refresh Token',
      );

    return this.signToken(decoded, type);
  }

  /**
   * ? Payload includes:
   * * 1) email
   * * 2) sub -> id
   * * 3) type: 'access' | 'refresh'
   */
  signToken(user: Pick<UsersModel, 'email' | 'id'>, type: TokenType) {
    const payload = {
      email: user.email,
      sub: user.id,
      type,
    };

    return this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: type === 'refresh' ? 3600 : 300, //seconds
    });
  }

  loginUser(user: Pick<UsersModel, 'email' | 'id'>) {
    return {
      accessToken: this.signToken(user, 'access'),
      refreshToken: this.signToken(user, 'refresh'),
    };
  }

  async authenticateWithEmailAndPassword(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('User Not Found');

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated)
      throw new UnauthorizedException('Wrong password or email');

    return user;
  }

  async loginWithEmail(email: string, password: string) {
    const user = await this.authenticateWithEmailAndPassword(email, password);

    return this.loginUser(user);
  }

  async registerWithEmail(email: string, password: string) {
    const hash = await bcrypt.hash(password, HASH_ROUNDS);
    const user = await this.usersService.createUser(email, hash);

    return this.loginUser(user);
  }
}
