// posts/posts.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from '../posts/posts.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async findAllForWebpage(webpageId: string): Promise<Post[]> {
    return this.postModel.find({ webpage: new Types.ObjectId(webpageId) }).exec();
  }

  async addPostToWebpage(webpageId: string, postData: Partial<Post>): Promise<Post> {
    const post = new this.postModel(postData);
    console.log(post);
    post.webpage = new Types.ObjectId(webpageId); // Set the webpage ID for the post
    return await post.save();
  }
}
