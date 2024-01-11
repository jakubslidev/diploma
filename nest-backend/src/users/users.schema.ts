// users.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  salt: String,
  firstName: String,
  roles: {
    type: Map,
    of: String,
    default: {} // Set default roles to an empty dictionary
  },
});