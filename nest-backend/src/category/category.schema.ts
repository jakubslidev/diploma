import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema  as MongooseSchema} from 'mongoose';
import { Webpage } from '../webpages/webpages.schema'; // Import the Webpage schema

@Schema()
export class Category extends Document {
  @Prop()
  name: string;

  @Prop({ type: [String], default: [] })
  subcategories: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Webpage' }) // Reference to the Webpage schema
  webpage: Webpage;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
