/* eslint-disable */
import * as _m0 from "protobufjs/minimal";


export interface AuthParams {
  token: string;
}

export interface AuthResponse {
  success?: AuthSuccess | undefined;
  error?: AuthFail | undefined;
}

export interface AuthSuccess {
  user: User | undefined;
}

export interface AuthFail {
  errorMessage: string;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

function createBaseAuthParams(): AuthParams {
  return { token: "" };
}

export const AuthParams = {
  encode(message: AuthParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthParams {
    return { token: isSet(object.token) ? String(object.token) : "" };
  },

  toJSON(message: AuthParams): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthParams>, I>>(base?: I): AuthParams {
    return AuthParams.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthParams>, I>>(object: I): AuthParams {
    const message = createBaseAuthParams();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseAuthResponse(): AuthResponse {
  return { success: undefined, error: undefined };
}

export const AuthResponse = {
  encode(message: AuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== undefined) {
      AuthSuccess.encode(message.success, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      AuthFail.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.success = AuthSuccess.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = AuthFail.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthResponse {
    return {
      success: isSet(object.success) ? AuthSuccess.fromJSON(object.success) : undefined,
      error: isSet(object.error) ? AuthFail.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: AuthResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success ? AuthSuccess.toJSON(message.success) : undefined);
    message.error !== undefined && (obj.error = message.error ? AuthFail.toJSON(message.error) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthResponse>, I>>(base?: I): AuthResponse {
    return AuthResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthResponse>, I>>(object: I): AuthResponse {
    const message = createBaseAuthResponse();
    message.success = (object.success !== undefined && object.success !== null)
      ? AuthSuccess.fromPartial(object.success)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? AuthFail.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseAuthSuccess(): AuthSuccess {
  return { user: undefined };
}

export const AuthSuccess = {
  encode(message: AuthSuccess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthSuccess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthSuccess {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: AuthSuccess): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthSuccess>, I>>(base?: I): AuthSuccess {
    return AuthSuccess.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthSuccess>, I>>(object: I): AuthSuccess {
    const message = createBaseAuthSuccess();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseAuthFail(): AuthFail {
  return { errorMessage: "" };
}

export const AuthFail = {
  encode(message: AuthFail, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.errorMessage !== "") {
      writer.uint32(10).string(message.errorMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthFail {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthFail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthFail {
    return { errorMessage: isSet(object.errorMessage) ? String(object.errorMessage) : "" };
  },

  toJSON(message: AuthFail): unknown {
    const obj: any = {};
    message.errorMessage !== undefined && (obj.errorMessage = message.errorMessage);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthFail>, I>>(base?: I): AuthFail {
    return AuthFail.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AuthFail>, I>>(object: I): AuthFail {
    const message = createBaseAuthFail();
    message.errorMessage = object.errorMessage ?? "";
    return message;
  },
};

function createBaseUser(): User {
  return { firstname: "", lastname: "", email: "", password: "" };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstname !== "") {
      writer.uint32(10).string(message.firstname);
    }
    if (message.lastname !== "") {
      writer.uint32(18).string(message.lastname);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(34).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.firstname = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastname = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      firstname: isSet(object.firstname) ? String(object.firstname) : "",
      lastname: isSet(object.lastname) ? String(object.lastname) : "",
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.firstname !== undefined && (obj.firstname = message.firstname);
    message.lastname !== undefined && (obj.lastname = message.lastname);
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.firstname = object.firstname ?? "";
    message.lastname = object.lastname ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

export interface AuthService {
  ValidateUser(request: AuthParams): Promise<AuthResponse>;
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service;
    this.rpc = rpc;
    this.ValidateUser = this.ValidateUser.bind(this);
  }
  ValidateUser(request: AuthParams): Promise<AuthResponse> {
    const data = AuthParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "ValidateUser", data);
    return promise.then((data) => AuthResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
