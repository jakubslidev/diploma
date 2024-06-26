// webpages/webpages.controller.ts

import { Controller, Get, Post, Body, Param, Req, UseGuards, NotFoundException, Delete, UnauthorizedException, Patch } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './webpages.schema'
import { AuthGuard } from '@nestjs/passport';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { JwtPayload } from 'src/authz/jwt.decorator';
import { Types } from 'mongoose';
import { BackendPost } from 'src/posts/post.interface';
import * as mongoose from 'mongoose';

@Controller('webpages')
export class WebpagesController {
  constructor(private readonly webpagesService: WebpagesService,
    private readonly webpageValidationService: WebpageValidationService,) {}
  @UseGuards(AuthGuard('jwt2'))
  @Post()
  async create(@Body() webpageData: any, @Req() req): Promise<{savedWebpage: Webpage, accessToken: string}> {
    const user = req.user; // This will contain the payload from the JWT token

    return this.webpagesService.create(webpageData, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Webpage[]> {
    return this.webpagesService.findAll();
  }
  
  @UseGuards(AuthGuard('jwt2'))
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

  @UseGuards(AuthGuard('jwt2'))
  @Post(':webpageId/main-post')
  async setMainPost(@Param('webpageId') webpageId: string, @Body('postId') postId: Types.ObjectId): Promise<Webpage> {
    return this.webpagesService.setMainPost(webpageId, postId);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Post(':webpageId/trending-posts')
  async addTrendingPost(@Param('webpageId') webpageId: string, @Body('postId') postId: Types.ObjectId): Promise<Webpage> {
    return this.webpagesService.addTrendingPost(webpageId, postId);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Delete(':webpageId/remove-trending-post/:postId')
  async removeTrendingPost(@Param('webpageId') webpageId: string, @Param('postId') postId: string): Promise<Webpage> {
    const objectIdPostId = new mongoose.Types.ObjectId(postId); // Convert postId to ObjectId
    return this.webpagesService.removeTrendingPost(webpageId, objectIdPostId); // Pass the ObjectId to the service method
  }

  @UseGuards(AuthGuard('jwt2'))
  @Get(':webpageId/posts')
  async getPostsForWebpage(@Param('webpageId') webpageId: string): Promise<{ trendingPosts: BackendPost[], mainPost: BackendPost | null }> {
    return this.webpagesService.getTrendingAndMainPosts(webpageId);
  }

  @Get(':webpageId/posts/noauth')
  async getPostsForWebpageNoAuth(@Param('webpageId') webpageId: string): Promise<{ trendingPosts: BackendPost[], mainPost: BackendPost | null }> {
    return this.webpagesService.getTrendingAndMainPosts(webpageId);
  }


  @UseGuards(AuthGuard('jwt2'))
  @Patch(':webpageId/status')
  async changeStatus(
    @Param('webpageId') webpageId: string, 
    @Body('status') status: string, 
    @Body('title') webpageTitle: string, 
    @Req() req
  ): Promise<Webpage> {
    const userId = req.user._id;
    const jwtRoles = req.user.roles;
  
    const role = await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
    if (role !== 'Admin') {
      throw new UnauthorizedException('Only admins can change webpage status');
    }
  
    return this.webpagesService.changeWebpageStatus(webpageId, status, webpageTitle, userId);
  }

@UseGuards(AuthGuard('jwt2'))
@Delete(':webpageId')
async deleteWebpage(@Param('webpageId') webpageId: string, @Req() req): Promise<void> {
  const userId = req.user._id;
  const jwtRoles = req.user.roles;

  // Validate if the user is an admin
  const role = await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
  if (role !== 'Admin') {
    throw new UnauthorizedException('Only admins can delete webpages');
  }

  await this.webpagesService.deleteWebpage(webpageId, userId);
}

@Get(':webpageId/status')
async getWebpageStatus(@Param('webpageId') webpageId: string): Promise<{ status: string }> {
  console.log(this.webpagesService.getWebpageStatus(webpageId));
  return this.webpagesService.getWebpageStatus(webpageId);
}
}
