import * as mongoose from 'mongoose';
export declare const WebpageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    posts: mongoose.Types.ObjectId[];
    users: {
        role?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    title?: string;
    content?: string;
}, mongoose.Document<unknown, {}, {
    posts: mongoose.Types.ObjectId[];
    users: {
        role?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    title?: string;
    content?: string;
}> & {
    posts: mongoose.Types.ObjectId[];
    users: {
        role?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    title?: string;
    content?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Webpage extends mongoose.Document {
    title: string;
    content: string;
    users: Array<{
        user: mongoose.Types.ObjectId;
        role: string;
    }>;
    posts: mongoose.Types.ObjectId[];
}
