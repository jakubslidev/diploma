"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpageSchema = void 0;
const mongoose = require("mongoose");
exports.WebpageSchema = new mongoose.Schema({
    title: String,
    content: String,
    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            role: String,
            email: String,
        },
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
//# sourceMappingURL=webpages.schema.js.map