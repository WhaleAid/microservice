import { Controller, Body, Headers, Post, Get, Req, BadRequestException } from '@nestjs/common';
import { Client, ClientGrpc, RpcException } from '@nestjs/microservices';
import { SocialService } from './social.service';
import {
  GetRequest,
  GetResponse,
  Social,
  SOCIAL_PACKAGE_NAME,
  SOCIAL_SERVICE_NAME,
  SocialServiceController,
} from './stubs/social/v1alpha/social';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { AuthServiceClient } from './stubs/auth/v1alpha/auth';
import { authMicroserviceOptions } from 'config/grpc.config';
import { AUTH_SERVICE_NAME } from './stubs/auth/auth';
import { authUser } from 'helpers/utils';
import { ParamType, SocialType } from './types/app.types';


@Controller()
export class AppController {

  @Client(authMicroserviceOptions)
  private clientAuth: ClientGrpc;


  private grpcAuthService: AuthServiceClient;


  constructor(
    private readonly socialService: SocialService,
  ) { }

  onModuleInit() {
    if(this.clientAuth)
      this.grpcAuthService = this.clientAuth.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @GrpcMethod(SOCIAL_SERVICE_NAME, 'checkSocial')
  async checkSocial(param: GetRequest) {
    try {
      if (!param.id || typeof param.id !== 'number') {
        return { error: 'invalid-id' };
      }
      const social = await this.socialService.findById(param.id);
      if (!social || Object.keys(social).length === 0) {
        return { error: 'social-not-found' };
      }
      return social as GetResponse;
    } catch (error) {
      return { error: 'internal-error' };
    }
  }

  @Get('/')
  async getAll() {
    try {
      const socials = await this.socialService.findAll();
      return { socials };
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get('/:id')
  async get(@Req() request: ParamType) {
    try {
      let social: Social;
      let socials: Social[] = [];
      if (request.id) {
        social = await this.socialService.findById(request.id);
        return { socials: [social] };
      } else {
        throw new BadRequestException('id is required');
      }
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get('/:id')
  async update(@Req() request: ParamType, @Body() body: SocialType, @Headers('Authorization') auth: string) {
    try {
      await authUser(auth, this.grpcAuthService)
      if(!request.id) throw new BadRequestException('id is required')
      if(!body.name) throw new BadRequestException('name is required')

      const social = await this.socialService.update(request.id, {
        name: body.name,
        price: body.price,
      });
      return { social }
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Post()
  async add(@Body() body: SocialType, @Headers('Authorization') auth: string) {
    try {
      await authUser(auth, this.grpcAuthService)
      const data = {
        name: body?.name,
        price: body.price,
      };
      const social = await this.socialService.create(data);
      return { social };
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}