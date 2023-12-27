import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';

import { RefreshTokenGuard } from './guard/bearerToken.guard';
import { BasicTokenGuard } from './guard/basicToken.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  createAccessToken(@Headers('authorization') authorizationHeader: string) {
    const token = this.authService.extractTokenFromHeader(
      authorizationHeader,
      'Bearer',
    );

    const newToken = this.authService.rotateToken(token, 'access');

    return { accessToken: newToken };
  }

  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  createRefreshToken(@Headers('authorization') authorizationHeader: string) {
    const token = this.authService.extractTokenFromHeader(
      authorizationHeader,
      'Bearer',
    );

    const newToken = this.authService.rotateToken(token, 'refresh');

    return { refreshToken: newToken };
  }

  @Post('login/email')
  @UseGuards(BasicTokenGuard)
  loginWithEmail(@Headers('authorization') authorizationHeader: string) {
    const basicToken = this.authService.extractTokenFromHeader(
      authorizationHeader,
      'Basic',
    );
    const { email, password } = this.authService.decodeBasicToken(basicToken);
    return this.authService.loginWithEmail(email, password);
  }

  @Post('register/email')
  registerWithEmail(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }
}
