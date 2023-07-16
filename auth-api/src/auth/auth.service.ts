/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(token: string) {
    if (!token || typeof token !== 'string') {
      return { error: 'no-token' };
    }
    const valid = await this.jwtService
      .verifyAsync(token)
      .catch(() => undefined);
    if (!valid) {
      return { error: 'invalid-token' };
    }
    const user = await this.userService.findOne(valid.email);
    return { user };
  }

  async login(data: { email: string; password: string }) {
    if (!data.email || !data.password) {
      return { error: 'nothing-provided' };
    }
    const user_ = await this.userModel.findOne({ email: data.email });
    if (!user_) {
      return { error: 'user-not-found' };
    }
    return {
      access_token: this.jwtService.sign({
        email: user_.email,
        firstname: user_.firstname,
        lastname: user_.lastname,
        expiresIn: '121212d',
      }),
    };
  }

  async addSocial(data: { id: string; social: string }) {
    if (!data.id || !data.social) {
      return { error: 'nothing-provided' };
    }
    const user_ = await this.userModel.findOne({ _id: data.id });
    if (!user_) {
      return { error: 'user-not-found' };
    }
    return {
      access_token: this.jwtService.sign({
        email: user_.email,
        firstname: user_.firstname,
        lastname: user_.lastname,
        socials: user_.socials,
        expiresIn: '121212d',
      }),
    };
  }

  async register(data: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }) {
    if (!data.email || !data.password) {
      return { error: 'nothing-provided' };
    }
    const user_ = await this.userModel.findOne({ email: data.email });
    if (user_) {
      return { error: 'user-already-exists' };
    }
    const createdUser = await this.userModel.create({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
    });
    return {
      access_token: this.jwtService.sign({
        ...createdUser,
        expiresIn: '121212d',
      }),
    };
  }
}
