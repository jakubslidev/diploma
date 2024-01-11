import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  webpageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webpage', required: true },
  reports: [{
    reason: { type: String, required: true },
    additionalInfo: { type: String, required: false },
    reportedAt: { type: Date, default: Date.now },
    status: {type: String, default: "Active"},
  }],
});

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
    reports: ReportDetail[]; // Define it as an array of ReportDetail
  }