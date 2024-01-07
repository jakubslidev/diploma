// posts/posts.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from '../posts/posts.schema';
import { UpdatePostDto } from './update-post.dto';

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

  async findAllActiveForWebpageLimited(webpageId: string): Promise<Post[]> {
    return this.postModel.find({ webpage: new Types.ObjectId(webpageId), status: 'Active' })
      .sort({ createdAt: -1 }) // Sort by createdAt date, descending (newest first)
      .limit(10) // Limit to 10 documents
      .exec();
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

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.findByIdAndDelete(postId).exec();
  }

  async searchPosts(webpageId: string, query: string): Promise<Post[]> {
    const searchRegex = new RegExp(query, 'i'); // Case-insensitive regex search
    try {
      const searchResults = await this.postModel.find({
        webpage: new Types.ObjectId(webpageId),
        status: 'Active',
        // Search in fields that you want, like title or content
        $or: [
          { title: { $regex: searchRegex } },
          { content: { $regex: searchRegex } },
        ],
      }).exec();
      
      return searchResults;
    } catch (error) {
      console.error('Error during post search:', error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  }
  
}
