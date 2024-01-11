"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvitationSchema = void 0;
const mongoose = require("mongoose");
exports.UserInvitationSchema = new mongoose.Schema({
    webpageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webpage', required: true },
    webpageName: { type: String, required: true },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=user-invitations.schema.js.map