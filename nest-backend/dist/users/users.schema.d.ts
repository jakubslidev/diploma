import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    roles: Map<string, string>;
    email?: string;
    password?: string;
    salt?: string;
}, mongoose.Document<unknown, {}, {
    roles: Map<string, string>;
    email?: string;
    password?: string;
    salt?: string;
}> & {
    roles: Map<string, string>;
    email?: string;
    password?: string;
    salt?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
