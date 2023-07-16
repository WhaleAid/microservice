import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Optional: Set a global prefix for your REST endpoints
  app.connectMicroservice<MicroserviceOptions>(microserviceOptions);
  await app.startAllMicroservices();
  await app.listen(process.env.AUTH_API_PORT ?? 3000).then(() => {
    logger.log(
      `Auth API is listening on port ${process.env.AUTH_API_PORT ?? 3000}`,
    );
  });
}

bootstrap();
