// webpages/webpages.controller.ts

import { Controller, Get, Post, Body, Param, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './webpages.schema'
import { AuthGuard } from '@nestjs/passport';

@Controller('webpages')
export class WebpagesController {
  constructor(private readonly webpagesService: WebpagesService) {}
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

  @UseGuards(AuthGuard('jwt'))
  @Get('user-webpages')
  async getUserWebpages(@Req() req) {
    const user = req.user; // This will contain the payload from the JWT token
    const webpages = await this.webpagesService.getWebpagesForUser(user);
    return webpages;
  }

}
