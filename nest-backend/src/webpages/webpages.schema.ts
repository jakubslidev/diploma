import * as mongoose from 'mongoose';

export const WebpageSchema = new mongoose.Schema({
  title: String,
  content: String,
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the name of your user model
      },
      role: String,
      email: String,
    },
  ],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Add this line for the array of posts
});

export interface Webpage extends mongoose.Document {
  title: string;
  content: string;
  users: Array<{
    user: mongoose.Types.ObjectId;
    role: string;
    email: string,
  }>;
  posts: mongoose.Types.ObjectId[]; // Define the type for the array of post references
}
