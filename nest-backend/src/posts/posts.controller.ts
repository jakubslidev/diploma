// posts/posts.controller.ts

import { Controller, Get, Post, Body, Param, UseGuards, Query, Patch, Delete, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.schema';
import { AuthGuard } from '@nestjs/passport';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { UpdatePostDto } from './update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, 
    private readonly webpageValidationService: WebpageValidationService,) {}

  @UseGuards(AuthGuard('jwt2'))
  @Post(':webpageId/addPost') 
  async addPostToWebpage(@Param('webpageId') webpageId: string, @Body() postData: Partial<PostModel>, @Query('categoryId') categoryId: string, @Request() req) {
    const userId = req.user._id;
    const jwtRoles = req.user.roles;
    await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
    return this.postsService.addPostToWebpage(webpageId, postData, categoryId);
  }


  @Get('/newest/:webpageId')
  getNewestPosts(@Param('webpageId') webpageId: string) {
    return this.postsService.findNewestPosts(webpageId);
  }

  @Get('/category/:categoryId/:webpageId')
  getPostsByCategory(@Param('categoryId') categoryId: string, @Param('webpageId') webpageId: string) {
    return this.postsService.findPostsByCategory(categoryId, webpageId);
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
    const jwtRoles = req.user.roles;
    await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
    return this.postsService.findAllForWebpage(webpageId);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Get('/view/webpage/:webpageId') 
  async findAllForWebpageView(@Param('webpageId') webpageId: string, @Request() req) {
    const userId = req.user._id;
    const jwtRoles = req.user.roles;
    await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
    return this.postsService.findAllForWebpage(webpageId);
  }

  // @UseGuards(AuthGuard('jwt2'))
  @Get('/view/webpage/:webpageId/withoutauth') 
  async findAllForUserView(@Param('webpageId') webpageId: string, @Request() req) {
    return this.postsService.findAllActiveForWebpage(webpageId);
  }

  @Get('/view/webpage/:webpageId/withoutauth/lazy')
  async findAllForUserViewLazy(
    @Param('webpageId') webpageId: string, 
    @Query('skip') skip: number = 0, 
    @Query('limit') limit: number = 3
  ) {
    return this.postsService.findAllActiveForWebpageLazy(webpageId, skip, limit);
  }


  @Get('/view/webpage/:webpageId/limited')
  async findAllForWebpageLimited(@Param('webpageId') webpageId: string) {
    return this.postsService.findAllActiveForWebpageLimited(webpageId);
  }
  
  @Patch(':id/updateStatus')
  updatePostStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.postsService.updatePostStatus(id, status);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id/deleteSelected')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Get('/search/:webpageId')
  search(@Param('webpageId') webpageId: string, @Query('q') query: string) {
    return this.postsService.searchPosts(webpageId, query);
  }

  @Get('/:webpageId/:categoryId/:subcategory')
  getPostsBySubcategory(
    @Param('webpageId') webpageId: string,
    @Param('categoryId') categoryId: string,
    @Param('subcategory') subcategory: string,
  ): Promise<PostModel[]> {
    return this.postsService.findPostsBySubcategory(webpageId, categoryId, subcategory);
  }

  @Patch(':id/incrementView')
  incrementViewCount(@Param('id') id: string) {
    return this.postsService.incrementViewCount(id);
  }

  @Patch(':id/incrementLike')
  incrementLikeCount(@Param('id') postId: string) {
    return this.postsService.incrementLikeCount(postId);
  }

  @Patch(':id/incrementDislike')
  incrementDislikeCount(@Param('id') postId: string) {
    return this.postsService.incrementDislikeCount(postId);
  }

}