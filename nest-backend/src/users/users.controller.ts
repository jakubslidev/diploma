//users.controller.ts

import { Controller, Post, Body, HttpStatus, HttpException, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private httpService: HttpService) {}

  // private async verifyRecaptcha(token: string): Promise<any> {
  //   const secretKey = "6LfR_UwpAAAAAETsoFNNhtjfnp_YX4W8XojhD6UM"
  //   const response = await firstValueFrom(
  //     this.httpService.post('https://www.google.com/recaptcha/api/siteverify', null, {
  //       params: {
  //         secret: secretKey,
  //         response: token,
  //       },
  //     })
  //   );
    
  //   return response.data;
  // }


  @Post('register')
  async register(@Body() userData: any): Promise<any> {
    const existingUser = await this.usersService.findByEmail(userData.email);
    console.log("existingUser" + existingUser);

    // const captchaResponse = await this.verifyRecaptcha(userData.captchaToken);
    // if (!captchaResponse.success) {
    //   throw new HttpException('CAPTCHA verification failed', HttpStatus.BAD_REQUEST);
    // } 
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

      // Store user information in the session
      req.session.user = { _id: user._id, email: user.email, roles: user.roles };
      console.log(req.session.user);

      // You can also store the user's ID in the session and retrieve the user details when needed
      // req.session.userId = user._id;

      const accessToken = this.usersService.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

}
