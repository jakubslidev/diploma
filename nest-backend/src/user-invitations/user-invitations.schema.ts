//User-invitations.schema.ts

import * as mongoose from 'mongoose';

export const UserInvitationSchema = new mongoose.Schema({
  webpageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webpage', required: true },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
