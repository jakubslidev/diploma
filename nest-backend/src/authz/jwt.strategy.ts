// jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { WebpagesService } from '../webpages/webpages.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly webpagesService: WebpagesService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret-key',
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any, req: Request) {
    console.log("PARAMS: " + req.params);
    console.log("PARAMS: " + req.query);
    const { _id: userID } = payload;
    console.log(payload);
    
    const webpageID = req.query.webpageId;
    console.log('WebpageID:', webpageID); 

    if (webpageID) {
      const webpage = await this.webpagesService.findOne(webpageID.toString());

      if (!webpage) {
        throw new UnauthorizedException('Webpage not found');
      }
      const userIsInWebpage = webpage.users.some(user => user.user.toString() === userID);

      if (!userIsInWebpage) {
        throw new UnauthorizedException();
      }
    }

    return payload;
  }
}
