import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { userLoginDto } from '../dto/userLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLogin: userLoginDto) {
    return this.authService.login(userLogin);
  }

}
