//users.controller.ts

import { Controller, Post, Body, HttpStatus, HttpException, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private httpService: HttpService) {}

  @Post('register')
  async register(@Body() userData: any): Promise<any> {
    const existingUser = await this.usersService.findByEmail(userData.email);
    console.log("existingUser" + existingUser);

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.usersService.create(userData);
    const accessToken = this.usersService.generateAccessToken(newUser);
    console.log("ACCESS TOKEN" + accessToken);
    return { user: newUser, accessToken };
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
      req.session.user = { _id: user._id, email: user.email, roles: user.roles };
      console.log(req.session.user);
      const accessToken = this.usersService.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

}
