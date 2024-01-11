import * as mongoose from 'mongoose';
export declare const ReportSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    reason: string;
    additionalInfo: string;
    reportedAt: Date;
    commentId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    webpageId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    reason: string;
    additionalInfo: string;
    reportedAt: Date;
    commentId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    webpageId: mongoose.Types.ObjectId;
}> & {
    reason: string;
    additionalInfo: string;
    reportedAt: Date;
    commentId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    webpageId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>;
