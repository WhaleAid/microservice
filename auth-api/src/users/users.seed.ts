import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserSeed {
  constructor(private readonly authService: AuthService) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
  })
  async create() {
    const user = await this.authService.register({
      firstname: 'Billy',
      lastname: 'Butcher',
      email: 'billy@butcher.com',
      password: 'diabolical',
    });
    console.log(user);
  }
}
