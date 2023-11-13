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

  async getWebpagesForUser(payload: JwtPayload): Promise<Webpage[]> {
    const userWebpages = await this.webpageModel.find({ 'users.user': payload._id }).exec();
    console.log(payload._id);
    return userWebpages;
  }
}
