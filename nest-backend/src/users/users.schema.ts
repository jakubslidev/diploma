// users.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  salt: String,
  role: {
    type: String,
    default: 'Worker' // Set default role to Worker
  },
});
