//users.controller.ts

import { Controller, Post, Body, HttpStatus, HttpException, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: any): Promise<any> {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.create(userData);
  }

  @Post('login')
  async login(@Body() loginData: any, @Req() req: Request): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(loginData.email);
      console.log(user);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid = await this.usersService.verifyPassword(loginData.password, user.password);

      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      // Store user information in the session
      req.session.user = { _id: user._id, email: user.email, role: user.role };
      console.log(req.session.user);

      // You can also store the user's ID in the session and retrieve the user details when needed
      // req.session.userId = user._id;

      const accessToken = this.usersService.generateAccessToken(user);
      console.log(accessToken);
      return { accessToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
