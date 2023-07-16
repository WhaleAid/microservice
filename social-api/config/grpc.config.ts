import { ClientProviderOptions, GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '../src/stubs/auth/auth';
import { SOCIAL_PACKAGE_NAME } from 'src/stubs/social/v1alpha/social';


export const authMicroserviceOptions: ClientProviderOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'auth-api:50031',
    package: AUTH_PACKAGE_NAME,
    protoPath: join(__dirname, '../src/proto/auth/auth.proto'),
  },
} as ClientProviderOptions;



export const socialMicroserviceOptions: ClientProviderOptions = {
  name: SOCIAL_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50131',
    package: SOCIAL_PACKAGE_NAME,
    protoPath: join(__dirname, '../src/proto/social/v1alpha/social.proto'),
  },
} as ClientProviderOptions;

