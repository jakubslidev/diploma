// posts/posts.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Post } from '../posts/posts.schema';
import { UpdatePostDto } from './update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findPostsByIds(postIds: string[]): Promise<Post[]> {
    return this.postModel.find({ _id: { $in: postIds } }).exec();
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

  async findAllActiveForWebpageLazy(webpageId: string, skip: number, limit: number): Promise<Post[]> {
    return this.postModel.find({ webpage: new Types.ObjectId(webpageId), status: 'Active' })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findAllActiveForWebpageLimited(webpageId: string): Promise<Post[]> {
    return this.postModel.find({ webpage: new Types.ObjectId(webpageId), status: 'Active' })
      .sort({ createdAt: -1 }) // -1 means descending order
      .limit(7) 
      .exec();
  }

  async addPostToWebpage(
    webpageId: string,
    postData: Partial<Post>,
    category: string,
    status: string = 'Draft', // Draft as default status because we don't want to publish the post immediately
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
    console.log('Updating post with ID:', id);
    console.log('Update data:', updatePostDto);
  
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
    console.log('Updated post:', updatedPost);
  
    return updatedPost;
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

  async findNewestPosts(webpageId: string): Promise<Post[]> {
    return this.postModel.find({ webpage: new Types.ObjectId(webpageId) })
                         .sort({ createdAt: -1 })
                         .limit(5)
                         .exec();
  }

  async findPostsByCategory(categoryId: string, webpageId: string): Promise<Post[]> {
    return this.postModel.find({ category: categoryId, webpage: new Types.ObjectId(webpageId) })
                         .exec();
  }

  async findPostsBySubcategory(webpageId: string, categoryId: string, subcategory: string): Promise<Post[]> {
    const caseInsensitiveSubcategory = new RegExp(subcategory, 'i'); // Create a case-insensitive regex

    return this.postModel.find({
      webpage: new mongoose.Types.ObjectId(webpageId),
      category: new mongoose.Types.ObjectId(categoryId),
      subcategories: { $regex: caseInsensitiveSubcategory }, // Use the regex for a case-insensitive search
      status: 'Active',
    }).exec();
  }

}
