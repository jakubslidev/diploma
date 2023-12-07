import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Post extends Document {
    title: string;
    content: string;
    webpage: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    categoryName: string;
    subcategories: string[];
    createdAt: Date;
    status: string;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, Document<unknown, any, Post> & Post & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, Document<unknown, {}, Post> & Post & {
    _id: mongoose.Types.ObjectId;
}>;
