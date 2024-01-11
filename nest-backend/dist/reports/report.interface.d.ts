import * as mongoose from 'mongoose';
export interface Report extends mongoose.Document {
    reason: string;
    additionalInfo: string;
    reportedAt: Date;
    commentId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    webpageId: mongoose.Types.ObjectId;
}
