// webpages/webpages.service.ts

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Webpage } from './webpages.schema';
import { JwtPayload } from '../authz/jwt-payload.interface'; // Import the JwtPayload interface

@Injectable()
export class WebpagesService {
  constructor(@InjectModel('Webpage') private readonly webpageModel: Model<Webpage>) {}

  async create(webpage: Webpage): Promise<Webpage> {
    const createdWebpage = new this.webpageModel(webpage);
    return createdWebpage.save();
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
}
