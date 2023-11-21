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
}

export const PostSchema = SchemaFactory.createForClass(Post);
