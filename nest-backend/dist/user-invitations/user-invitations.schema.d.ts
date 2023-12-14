import * as mongoose from 'mongoose';
export declare const UserInvitationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    webpageId: mongoose.Types.ObjectId;
    invitedBy: mongoose.Types.ObjectId;
    invitee: mongoose.Types.ObjectId;
    role: string;
    status: "pending" | "accepted" | "declined";
    createdAt: Date;
}, mongoose.Document<unknown, {}, {
    webpageId: mongoose.Types.ObjectId;
    invitedBy: mongoose.Types.ObjectId;
    invitee: mongoose.Types.ObjectId;
    role: string;
    status: "pending" | "accepted" | "declined";
    createdAt: Date;
}> & {
    webpageId: mongoose.Types.ObjectId;
    invitedBy: mongoose.Types.ObjectId;
    invitee: mongoose.Types.ObjectId;
    role: string;
    status: "pending" | "accepted" | "declined";
    createdAt: Date;
} & {
    _id: mongoose.Types.ObjectId;
}>;
