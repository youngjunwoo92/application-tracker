import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  createTokenAccess(@Headers('authorization') authorizationHeader: string) {
    const token = this.authService.extractTokenFromHeader(
      authorizationHeader,
      'Bearer',
    );

    const newToken = this.authService.rotateToken(token, 'access');

    return { accessToken: newToken };
  }

  @Post('token/refresh')
  createTokenRefresh(@Headers('authorization') authorizationHeader: string) {
    const token = this.authService.extractTokenFromHeader(
      authorizationHeader,
      'Bearer',
    );

    const newToken = this.authService.rotateToken(token, 'refresh');

    return { refreshToken: newToken };
  }

  @Post('login/email')
  loginWithEmail(@Headers('authorization') authorizationHeader: string) {
    const token = this.authService.extractTokenFromHeader(
      authorizationHeader,
      'Basic',
    );
    const { email, password } = this.authService.decodeBasicToken(token);
    return this.authService.loginWithEmail(email, password);
  }

  @Post('register/email')
  registerWithEmail(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerWithEmail(email, password);
  }
}
