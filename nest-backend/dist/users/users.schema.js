"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    salt: String,
    firstName: String,
    roles: {
        type: Map,
        of: String,
        default: {}
    },
});
//# sourceMappingURL=users.schema.js.map