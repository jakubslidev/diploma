//webpage.schema.ts

import * as mongoose from 'mongoose';

export const WebpageSchema = new mongoose.Schema({
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
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  trendingPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Added for trending posts
  mainPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Added for main post
  status: String,
});

export interface Webpage extends mongoose.Document {
  title: string;
  content: string;
  users: Array<{
    user: mongoose.Types.ObjectId;
    role: string;
    email: string,
  }>;
  posts: mongoose.Types.ObjectId[];
  trendingPosts: mongoose.Types.ObjectId[]; // Trending posts array
  mainPost: mongoose.Types.ObjectId; // Main post reference
  status: string;
}
