// webpages/webpages.controller.ts

import { Controller, Get, Post, Body, Param, Req, UseGuards, NotFoundException, Delete } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './webpages.schema'
import { AuthGuard } from '@nestjs/passport';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { JwtPayload } from 'src/authz/jwt.decorator';

@Controller('webpages')
export class WebpagesController {
  constructor(private readonly webpagesService: WebpagesService,
    private readonly webpageValidationService: WebpageValidationService,) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() webpage: Webpage): Promise<Webpage> {
    return this.webpagesService.create(webpage);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Webpage[]> {
    return this.webpagesService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/pages/:id')
  async findById(@Param('id') id: string): Promise<Webpage> {
    return this.webpagesService.findById(id);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Get('user-webpages')
  async getUserWebpages(@Req() req) {
    const user = req.user; // This will contain the payload from the JWT token
    console.log(user);
    const webpages = await this.webpagesService.getWebpagesForUser(user);
    return webpages;
  }

  @UseGuards(AuthGuard('jwt2'))
  @Get(':webpageId/role')
  async getUserRole(@Param('webpageId') webpageId: string, @Req() req) {
    const userId = req.user._id;
    const jwtRoles = req.user.roles;
    const role = await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
    return { role };
  }

  @UseGuards(AuthGuard('jwt2'))
  @Get(':webpageId/users')
  async findAllUsersForWebpage(@Param('webpageId') webpageId: string): Promise<any[]> {
    try {
      const users = await this.webpagesService.findAllUsersForWebpage(webpageId);
      console.log(users);
      return users;
    } catch (error) {
      throw new NotFoundException('Webpage not found or error fetching users: ' + error.message);
    }
  }

  @UseGuards(AuthGuard('jwt2'))
  @Delete(':webpageId/remove-user/:userId')
  async removeUser(@Param('webpageId') webpageId: string, @Param('userId') userId: string): Promise<Webpage> {
    return this.webpagesService.removeUserFromWebpage(userId, webpageId);
  }

}
