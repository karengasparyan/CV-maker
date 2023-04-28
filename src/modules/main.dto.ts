import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import { NextFunction, Request, Response } from 'express';

export type response = Response;
export type next = NextFunction;

class requestUser {
    id: string;
    name: string;
    last_name: string
    email: string;
    customer_id: string | null;
    password: string;
    image: string;
    verified_at: string | null;
    socials: string;
}

export interface RequestType extends Request {
  user: requestUser
}

export class uuId {
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    readonly id: string;
}

export class stripeId {
    @IsString()
    readonly id: string
}

export interface File {
    readonly fieldname: string;
    readonly originalname: string;
    readonly encoding: string;
    readonly mimetype: string;
    readonly buffer: Buffer;
    size: number;
}

export interface returnResponse {
    readonly status?: number;
    readonly message: string;
    readonly data?: any | object;
}

export interface JwtPayload {
    id: string;
}
