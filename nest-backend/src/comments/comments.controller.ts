import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comment } from './comment.interface';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() commentData: Comment) {
    return this.commentService.create(commentData);
  }

  @Get(':postId')
  async findAll(@Param('postId') postId: string) {
    return this.commentService.findAll(postId);
  }
}
