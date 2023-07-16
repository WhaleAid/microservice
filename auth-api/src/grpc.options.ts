import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from './stubs/auth/auth';

export const microserviceOptions: ClientProviderOptions = {
  name: AUTH_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: AUTH_PACKAGE_NAME,
    url: '0.0.0.0:50031',
    protoPath: join(__dirname, '../src/protos/auth.proto'),
  },
} as ClientProviderOptions;
