import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';

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
  async login(@Body() loginData: any): Promise<any> {
    try {
      const accessToken = await this.usersService.login(loginData.email, loginData.password);
      return { accessToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
