import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
// TODO: Replace by @nestjs/config
import { config } from 'dotenv';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UserSeed } from 'src/users/users.seed';
import { CommandModule } from 'nestjs-command';
config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CommandModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, UserSeed],
  exports: [UserSeed],
})
export class AuthModule {}
