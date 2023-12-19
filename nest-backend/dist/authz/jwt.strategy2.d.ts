import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { WebpagesService } from '../webpages/webpages.service';
declare const JwtStrategy2_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy2 extends JwtStrategy2_base {
    private readonly webpagesService;
    constructor(webpagesService: WebpagesService);
    validate(payload: any, req: Request): Promise<any>;
}
export {};
