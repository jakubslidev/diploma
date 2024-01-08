//post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Webpage' })
  webpage: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }) // Reference to Category schema
  category: mongoose.Types.ObjectId;

  @Prop()
  categoryName: string;
  
  // @Prop()
  // category: string;

  @Prop({ type: [String], default: [] }) // Array of strings (subcategories)
  subcategories: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 'Draft', enum: ['Active', 'Draft'] })
  status: string; // "Active" or "Draft"

  @Prop()
  thumbnailBig: string;

  @Prop()
  thumbnailSmall: string;

  @Prop()
  titleColor: string;

  @Prop()
  categoryColor: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
