import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './posts.schema';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { WebpagesModule } from '../webpages/webpages.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),WebpagesModule
  ],
  controllers: [PostsController],
  providers: [PostsService, WebpageValidationService],
})
export class PostsModule {}
