import { Body, Controller, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthParams } from './auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'validateUser')
  async validateUser(param: AuthParams) {
    return await this.authService.validateUser(param.token);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return await this.authService.login(data);
  }

  @Post('addSocial')
  async addSocial(@Body() data: { id: string; social: string }) {
    return await this.authService.addSocial(data);
  }

  @Post('register')
  async register(
    @Body()
    data: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    },
  ) {
    return await this.authService.register(data);
  }
}
