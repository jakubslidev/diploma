// backend-post.interface.ts

import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface BackendPost extends Document {
  title: string;
  content: string;
  webpage: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  categoryName: string;
  subcategories: string[];
  createdAt: Date;
  status: string;
  thumbnailBig: string;
  thumbnailSmall: string;
  titleColor: string;
  categoryColor: string;
  // Add other properties as needed
}

