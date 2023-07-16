import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { authMicroserviceOptions, socialMicroserviceOptions } from '../config/grpc.config';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
const SOCIAL_API_PORT = process.env.SOCIAL_API_PORT ?? 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(socialMicroserviceOptions);


  await app.startAllMicroservices();
  await app.listen(SOCIAL_API_PORT).then(() => {
    logger.log(
      `Auth API is listening on port ${SOCIAL_API_PORT}`,
    );
  });
}

bootstrap();