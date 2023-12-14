import { Document } from 'mongoose';
export interface UserInvitation extends Document {
    webpageId: string;
    invitedBy: string;
    invitee: string;
    role: string;
    status: string;
    createdAt: Date;
}
