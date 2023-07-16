/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "social";

export interface Social {
  name?: string | undefined;
  id?: number | undefined;
  url?: string | undefined;
}

export interface GetRequest {
  id?: number | undefined;
}

export interface GetResponse {
  social?: Social | undefined;
  error?: string | undefined;
}

export const SOCIAL_PACKAGE_NAME = "social";

export function SocialServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SocialService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SOCIAL_SERVICE_NAME = "SocialService";
