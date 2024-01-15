import * as mongoose from 'mongoose';
export declare const UserInvitationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: Date;
    status: "pending" | "accepted" | "declined";
    role: string;
    webpageId: mongoose.Types.ObjectId;
    webpageName: string;
    invitedBy: mongoose.Types.ObjectId;
    invitee: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    createdAt: Date;
    status: "pending" | "accepted" | "declined";
    role: string;
    webpageId: mongoose.Types.ObjectId;
    webpageName: string;
    invitedBy: mongoose.Types.ObjectId;
    invitee: mongoose.Types.ObjectId;
}> & {
    createdAt: Date;
    status: "pending" | "accepted" | "declined";
    role: string;
    webpageId: mongoose.Types.ObjectId;
    webpageName: string;
    invitedBy: mongoose.Types.ObjectId;
    invitee: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>;
