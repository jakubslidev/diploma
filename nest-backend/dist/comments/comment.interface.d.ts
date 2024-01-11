import { Document } from 'mongoose';
export interface Comment extends Document {
    content: string;
    createdAt: Date;
    postId: string;
    webpageId: string;
    reports: [];
}
