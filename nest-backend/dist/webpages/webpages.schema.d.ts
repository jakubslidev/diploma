import * as mongoose from 'mongoose';
export declare const WebpageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    users: {
        role?: string;
        email?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    posts: mongoose.Types.ObjectId[];
    trendingPosts: mongoose.Types.ObjectId[];
    title?: string;
    content?: string;
    mainPost?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    users: {
        role?: string;
        email?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    posts: mongoose.Types.ObjectId[];
    trendingPosts: mongoose.Types.ObjectId[];
    title?: string;
    content?: string;
    mainPost?: mongoose.Types.ObjectId;
}> & {
    users: {
        role?: string;
        email?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    posts: mongoose.Types.ObjectId[];
    trendingPosts: mongoose.Types.ObjectId[];
    title?: string;
    content?: string;
    mainPost?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Webpage extends mongoose.Document {
    title: string;
    content: string;
    users: Array<{
        user: mongoose.Types.ObjectId;
        role: string;
        email: string;
    }>;
    posts: mongoose.Types.ObjectId[];
    trendingPosts: mongoose.Types.ObjectId[];
    mainPost: mongoose.Types.ObjectId;
}
