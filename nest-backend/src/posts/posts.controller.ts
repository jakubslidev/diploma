// posts/posts.controller.ts

import { Controller, Get, Post, Body, Param, UseGuards, Query, Patch, Delete, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.schema';
import { AuthGuard } from '@nestjs/passport';
import { WebpageValidationService } from '../authz/webpage-validation.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, 
    private readonly webpageValidationService: WebpageValidationService,) {}

  @UseGuards(AuthGuard('jwt2'))
  @Post(':webpageId/addPost') 
  async addPostToWebpage(@Param('webpageId') webpageId: string, @Body() postData: Partial<PostModel>, @Query('categoryId') categoryId: string, @Request() req) {
    const userId = req.user._id;
    await this.webpageValidationService.validateWebpageId(webpageId, userId);
    return this.postsService.addPostToWebpage(webpageId, postData, categoryId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Get('/webpage/:webpageId') 
  async findAllForWebpageBackOffice(@Param('webpageId') webpageId: string, @Request() req) {
    const userId = req.user._id;
    await this.webpageValidationService.validateWebpageId(webpageId, userId);
    return this.postsService.findAllForWebpage(webpageId);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Get('/view/webpage/:webpageId') 
  async findAllForWebpageView(@Param('webpageId') webpageId: string, @Request() req) {
    const userId = req.user._id;
    await this.webpageValidationService.validateWebpageId(webpageId, userId);
    return this.postsService.findAllForWebpage(webpageId);
  }
  
  @Patch(':id/updateStatus')
  updatePostStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.postsService.updatePostStatus(id, status);
  }

  @Delete(':id/deleteSelected')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}