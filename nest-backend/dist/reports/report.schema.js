"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSchema = void 0;
const mongoose = require("mongoose");
exports.ReportSchema = new mongoose.Schema({
    reason: { type: String, required: true },
    additionalInfo: { type: String, default: '' },
    reportedAt: { type: Date, default: Date.now },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    webpageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webpage', required: true },
});
//# sourceMappingURL=report.schema.js.map