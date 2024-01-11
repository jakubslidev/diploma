import * as mongoose from 'mongoose';
export declare const CommentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    content: string;
    createdAt: Date;
    webpageId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    reports: {
        status: string;
        reason: string;
        reportedAt: Date;
        additionalInfo?: string;
    }[];
}, mongoose.Document<unknown, {}, {
    content: string;
    createdAt: Date;
    webpageId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    reports: {
        status: string;
        reason: string;
        reportedAt: Date;
        additionalInfo?: string;
    }[];
}> & {
    content: string;
    createdAt: Date;
    webpageId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    reports: {
        status: string;
        reason: string;
        reportedAt: Date;
        additionalInfo?: string;
    }[];
} & {
    _id: mongoose.Types.ObjectId;
}>;
export interface ReportDetail {
    reason: string;
    additionalInfo?: string;
    reportedAt: Date;
    status: string;
}
export interface Comment extends mongoose.Document {
    content: string;
    createdAt: Date;
    postId: mongoose.Types.ObjectId;
    webpageId: mongoose.Types.ObjectId;
    reports: ReportDetail[];
}
