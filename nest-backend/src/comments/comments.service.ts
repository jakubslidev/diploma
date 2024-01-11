import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.interface';
import { ReportDetail } from './comments.schema';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}

  async create(commentData: Comment): Promise<Comment> {
    const newComment = new this.commentModel(commentData);
    return await newComment.save();
  }

  async findAll(postId: string): Promise<Comment[]> {
    return await this.commentModel.find({ postId }).exec();
  }

}