// authz.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtStrategy2 } from './jwt.strategy2';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { WebpagesModule } from '../webpages/webpages.module'; // Import WebpagesModule

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule, 
    WebpagesModule, 
  ],
  providers: [JwtStrategy, JwtStrategy2],
  exports: [PassportModule],
})
export class AuthzModule {}