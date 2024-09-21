import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Date,
  HydratedDocument,
  Document,
  Schema as MongooseSchema,
} from 'mongoose';
import {
  Lanauge,
  InterviewType,
  InterviewStatusType,
} from 'src/shared/constant';
import { User } from 'src/users/schema/user.schema';
import { Feedback } from './feedback.schema';
import { InterviewScriptDto } from 'src/shared/dto/interview.dto';

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

  @Prop({
    required: true,
    enum: Object.values(InterviewStatusType),
    default: InterviewStatusType.Initiated,
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  interviewee: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Feedback' })
  feedback: Feedback;

  @Prop({ type: [InterviewScriptDto], default: [] })
  script: InterviewScriptDto[];

  @Prop({ type: Date, default: Date.now() })
  createdAT: Date;
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
