import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    role: string;
    email?: string;
    password?: string;
    salt?: string;
}, mongoose.Document<unknown, {}, {
    role: string;
    email?: string;
    password?: string;
    salt?: string;
}> & {
    role: string;
    email?: string;
    password?: string;
    salt?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
