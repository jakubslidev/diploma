// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async findByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: any): Promise<any> {
    const existingUser = await this.findByEmail(userData.email);
  
    if (existingUser) {
      throw new Error('User already exists');
    }
  
    const saltRounds = 10; // Number of rounds for the salt
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
  
    const newUser = new this.userModel({
      email: userData.email,
      password: hashedPassword,
      salt: salt
    });
  
    return newUser.save();
  }
  
  

  async login(email: string, password: string): Promise<string> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const accessToken = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });

    return accessToken;
  }
}
