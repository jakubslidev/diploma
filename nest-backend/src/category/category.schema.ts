import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop()
  name: string;

  @Prop({ type: [String], default: [] }) // Define an array of strings for subcategory names
  subcategories: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
