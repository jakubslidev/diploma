"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    webpageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webpage', required: true },
    reports: [{
            reason: { type: String, required: true },
            additionalInfo: { type: String, required: false },
            reportedAt: { type: Date, default: Date.now },
            status: { type: String, default: "Active" },
        }],
});
//# sourceMappingURL=comments.schema.js.map