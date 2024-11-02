import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './types/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userData: { email: string; password: string; name: string },
  ) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Req() req: RequestWithUser) {
    return this.authService.validateToken(req.user);
  }
}
