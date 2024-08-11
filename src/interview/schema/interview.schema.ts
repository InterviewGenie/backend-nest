import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Document } from 'mongoose';
import { Lanauge, InterviewType } from 'src/shared/constant';

export type InterviewDocument = HydratedDocument<Interview>;

@Schema()
export class Interview extends Document {
  @Prop({
    required: true,
    enum: Object.values(InterviewType),
    default: InterviewType.Intro,
  })
  senario: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  company: string;

  @Prop({
    required: true,
    enum: Object.values(Lanauge),
    default: Lanauge.English,
  })
  language: string;

  @Prop({ type: Date, required: true })
  schedule: Date;

  @Prop()
  cv: string;

  @Prop()
  instruction: string;

  @Prop([String])
  keywords: string[];

  @Prop({ type: Date, default: Date.now() })
  createdAT: Date;
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
