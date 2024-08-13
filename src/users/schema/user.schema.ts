import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Date,
  HydratedDocument,
  Document,
  Schema as MongooseSchema,
} from 'mongoose';
import { Interview } from 'src/interview/schema/interview.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date })
  lastLogin: Date;

  @Prop({ type: Date, default: Date.now() })
  createdAT: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Interview' }] })
  interviews: Interview[];
}

export const UserSchema = SchemaFactory.createForClass(User);
