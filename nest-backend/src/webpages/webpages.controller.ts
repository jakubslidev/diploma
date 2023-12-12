// webpages/webpages.controller.ts

import { Controller, Get, Post, Body, Param, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './webpages.schema'
import { AuthGuard } from '@nestjs/passport';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { JwtPayload } from 'src/authz/jwt.decorator';
//import { JwtPayload } from 'src/authz/jwt-payload.interface';

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

}
