import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comments.schema';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentsModule {}
