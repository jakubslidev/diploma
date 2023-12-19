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

  async findAllActiveForWebpage(webpageId: string): Promise<Post[]> {
    return this.postModel.find({ webpage: new Types.ObjectId(webpageId), status: 'Active' }).exec();
  }

  async addPostToWebpage(
    webpageId: string,
    postData: Partial<Post>,
    category: string,
    status: string = 'Draft', // default to 'Draft'
  ): Promise<Post> {
    const post = new this.postModel({ ...postData, status });
    post.webpage = new Types.ObjectId(webpageId);
    return await post.save();
  }

  async updatePostStatus(postId: string, status: string): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(
      postId,
      { $set: { status } },
      { new: true }, // return the updated document
    ).exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.findByIdAndDelete(postId).exec();
  }
}
