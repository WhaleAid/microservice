import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocialService } from './social.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { authMicroserviceOptions } from '../config/grpc.config';
import { PrismaService } from './prisma.service';
import { ClientsModule } from '@nestjs/microservices';
import { SocialSeed } from './social.seed';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    CommandModule,
  ],
  controllers: [AppController],
  providers: [SocialService, PrismaService, SocialSeed],
  exports: [SocialSeed],
})
export class AppModule { }