import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Webpage' }) // Add this line for the reference
  webpage: mongoose.Types.ObjectId; 
}

export const PostSchema = SchemaFactory.createForClass(Post);
