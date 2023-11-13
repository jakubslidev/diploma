// posts/posts.controller.ts

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':webpageId/addPost') // Define a route parameter ':webpageId' and sub-route 'addPost'
  addPostToWebpage(@Param('webpageId') webpageId: string, @Body() postData: Partial<PostModel>) {
    return this.postsService.addPostToWebpage(webpageId, postData);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('/webpage/:webpageId') // New endpoint to retrieve posts for a specific webpage
  findAllForWebpage(@Param('webpageId') webpageId: string) {
    return this.postsService.findAllForWebpage(webpageId);
  }
}
