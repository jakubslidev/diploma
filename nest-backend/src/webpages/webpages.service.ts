// webpages/webpages.service.ts

import mongoose, { Model, ObjectId } from 'mongoose';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Webpage } from './webpages.schema';
import { JwtPayload } from '../authz/jwt-payload.interface'; // Import the JwtPayload interface
import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Post } from 'src/posts/posts.schema';
import { Document } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class WebpagesService {
  constructor(@InjectModel('Webpage') private readonly webpageModel: Model<Webpage>, private usersService: UsersService, private readonly postService: PostsService,) {}

  async create(webpageData: any, payload: JwtPayload): Promise<{savedWebpage: Webpage, accessToken: string}> {
    // Create a new webpage object
    const createdWebpage = new this.webpageModel({
      ...webpageData,
      users: [{ user: payload._id, role: 'Admin', email: payload.email }],
    });
  
    const savedWebpage = await createdWebpage.save();
  
    const user = await this.usersService.findById(payload._id);
    if (!user) throw new UnauthorizedException('User not found');
    
    // Initialize roles if undefined
    user.roles = user.roles || {};
    user.roles.set(savedWebpage._id.toString(), "Admin");
  
    await user.save();
  
    const accessToken = this.usersService.generateAccessToken(user);
  
    // Return the saved webpage and the access token
    return {
      savedWebpage,
      accessToken,
    };
  }

  async findAll(): Promise<Webpage[]> {
    return this.webpageModel.find().exec();
  }

  async findById(id: string): Promise<Webpage> {
    return this.webpageModel.findById(id).exec();
  }

  async getWebpagesForUser(payload: JwtPayload): Promise<any[]> {
    const userWebpages = await this.webpageModel.find({ 'users.user': payload._id }).exec();
    console.log(payload._id);

    // Map over the webpages to include the user's role
    const userWebpagesWithRole = userWebpages.map(webpage => {
      const userInWebpage = webpage.users.find(user => user.user.toString() === payload._id);
      return {
        ...webpage.toObject(),
        role: userInWebpage ? userInWebpage.role : null,
      };
    });

    return userWebpagesWithRole;
  }

  async findOne(webpageId: string): Promise<Webpage> {
    return this.webpageModel.findById(webpageId).exec();
  }

  async isUserInWebpage(userID: string, webpageId: string): Promise<boolean> {
    try {
      const webpage = await this.webpageModel.findById(webpageId).exec();
      if (!webpage) {
        return false; // Webpage not found
      }

      const userInWebpage = webpage.users.some((user) => user.user.equals(userID));
      return userInWebpage;
    } catch (error) {
      return false;
    }
  }

  async findAllUsersForWebpage(webpageId: string): Promise<any[]> {
    try {
      const webpage = await this.webpageModel.findById(webpageId).exec();
      if (!webpage) {
        return []; // Return an empty array if the webpage doesn't exist
      }
      return webpage.users; // Assuming 'users' is an array of user information in the Webpage schema
    } catch (error) {
      throw new Error('Error fetching users for webpage: ' + error.message);
    }
  }


  async removeUserFromWebpage(userEmail: string, webpageId: string): Promise<Webpage> {
    // Find the user by email first
    const user = await this.usersService.findByEmail(userEmail);
    if (!user) {
      throw new Error('User not found');
    }
  
    // Remove the role from the user's roles
    if (user.roles && user.roles.has(webpageId)) {
      user.roles.delete(webpageId); // Removes the role for the webpage
      await user.save(); // Save the updated user document
    }
  
    // Remove the user from the webpage
    return this.webpageModel.findOneAndUpdate(
      { _id: webpageId },
      { $pull: { users: { email: userEmail } } }, // Remove the user with the specified email
      { new: true }
    ).exec();
  }

  async setMainPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage> {
    return this.webpageModel.findByIdAndUpdate(
      webpageId,
      { $set: { mainPost: postId } },
      { new: true }
    ).exec();
  }

  async addTrendingPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage> {
    return this.webpageModel.findByIdAndUpdate(
      webpageId,
      { $addToSet: { trendingPosts: postId } }, // Use $addToSet to avoid duplicates
      { new: true }
    ).exec();
  }

  async removeTrendingPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage> {
    return this.webpageModel.findByIdAndUpdate(
      webpageId,
      { $pull: { trendingPosts: postId } }, // Use $pull to remove the post
      { new: true }
    ).exec();
  }

  
  async getTrendingAndMainPosts(webpageId: string): Promise<{ trendingPosts: Post[], mainPost: Post | null }> {
    const webpage = await this.webpageModel
      .findById(webpageId)
      .populate('trendingPosts')
      .populate('mainPost')
      .exec();
      
    if (!webpage) {
      throw new Error('Webpage not found');
    }
  
    const trendingPostsIds = webpage.trendingPosts.map(post => post._id.toString());
    const mainPostId = webpage.mainPost ? webpage.mainPost._id.toString() : null;
    
    console.log(trendingPostsIds);
    console.log(mainPostId);

    const mainPost: Post | null = mainPostId ? await this.postService.findOne(mainPostId) : null;
    console.log("mainPOST" + mainPost);
    console.log(this.postService.findPostsByIds(trendingPostsIds));

    // Use the PostService to retrieve posts by their IDs with the specified fields
    const trendingPosts: Post[] = await this.postService.findPostsByIds(trendingPostsIds);
    
  
    return {
      trendingPosts,
      mainPost
    };
}


  
}
