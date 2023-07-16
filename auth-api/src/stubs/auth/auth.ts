/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Social } from "../social/v1alpha/social";

export const protobufPackage = "auth";

export interface AuthParams {
  token?: string | undefined;
}

export interface SocialParams {
  id?: string | undefined;
  social?: string | undefined;
}

export interface AuthResponse {
  user?: User | undefined;
  error?: string | undefined;
}

export interface User {
  id?: number | undefined;
  firstname?: string | undefined;
  lastname?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  socials?: Social[] | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  validateUser(request: AuthParams, metadata?: Metadata): Observable<AuthResponse>;
  addSocial(request: SocialParams, metadata?: Metadata): Observable<AuthResponse>;
}

export interface AuthServiceController {
  validateUser(
    request: AuthParams,
    metadata?: Metadata,
  ): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  addSocial(
    request: SocialParams,
    metadata?: Metadata,
  ): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["validateUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
