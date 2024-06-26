// jwt.strategy2.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { WebpagesService } from '../webpages/webpages.service';

@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy, 'jwt2') {
    constructor(private readonly webpagesService: WebpagesService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret-key', 
        algorithms: ['HS256'], 
      });
    }

  async validate(payload: any, req: Request) {
    const { _id: userID } = payload;
    return payload;
  }
}
