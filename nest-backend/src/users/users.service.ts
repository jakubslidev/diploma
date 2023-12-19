// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async findByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(_id: string): Promise<any> {
    return this.userModel.findOne({ _id }).exec();
  }

  async create(userData: any): Promise<any> {
    const existingUser = await this.findByEmail(userData.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new this.userModel({
      email: userData.email,
      password: hashedPassword,
      salt: salt,
    });

    return newUser.save();
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  generateAccessToken(user: any): string {
    return jwt.sign({ _id: user._id, email: user.email, roles: user.roles }, 'secret-key', { expiresIn: '4h' });
  }
}
