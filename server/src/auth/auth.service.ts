import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersModel } from 'src/users/entities/users.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';

type TokenType = 'access' | 'refresh';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
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
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.secret'),
      });
    } catch (e) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }

  rotateToken(token: string, type: TokenType) {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.secret'),
    });

    if (decoded.type !== 'refresh')
      throw new UnauthorizedException(
        'Token can only be renewed with Refresh Token',
      );

    return this.signToken(decoded, type);
  }

  signToken(user: Pick<UsersModel, 'email' | 'id'>, type: TokenType) {
    const payload = {
      email: user.email,
      sub: user.id,
      type,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn:
        type === 'refresh'
          ? this.configService.get<number>('jwt.refreshTokenExpiration')
          : this.configService.get<number>('jwt.accessTokenExpiration'),
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

    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) throw new UnauthorizedException('Wrong password or email');

    return user;
  }

  async loginWithEmail(email: string, password: string) {
    const user = await this.authenticateWithEmailAndPassword(email, password);

    return this.loginUser(user);
  }

  async registerWithEmail(user: RegisterUserDto) {
    const { email, password } = user;
    const hash = await bcrypt.hash(
      password,
      this.configService.get<number>('bcrypt.hashRounds'),
    );
    const newUser = await this.usersService.createUser(email, hash);

    return this.loginUser(newUser);
  }
}
