import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Document } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema()
export class Feedback extends Document {
  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Date, default: Date.now() })
  createdAT: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
