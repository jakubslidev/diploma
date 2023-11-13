import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Change this to your actual JWT secret
      algorithms: ['HS256'], // Change this to your actual algorithm
    });
    console.log('JwtStrategy instantiated');
  }

  validate(payload: JwtPayload): JwtPayload {
    console.log('Payload validated:', payload);

    // if (payload.role === 'Admin') {
    //   return payload;
    // } else {
    //   throw new UnauthorizedException('You do not have permission to access this resource');
    // }
    return payload;
  }
}
