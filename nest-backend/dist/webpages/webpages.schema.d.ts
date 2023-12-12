import * as mongoose from 'mongoose';
export declare const WebpageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    users: {
        role?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    posts: mongoose.Types.ObjectId[];
    title?: string;
    content?: string;
}, mongoose.Document<unknown, {}, {
    users: {
        role?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    posts: mongoose.Types.ObjectId[];
    title?: string;
    content?: string;
}> & {
    users: {
        role?: string;
        user?: mongoose.Types.ObjectId;
    }[];
    posts: mongoose.Types.ObjectId[];
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
