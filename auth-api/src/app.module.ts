import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { microserviceOptions } from './grpc.options';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ClientsModule.register([microserviceOptions]),
  ],
})
export class AppModule {}
