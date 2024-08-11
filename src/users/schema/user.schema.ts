import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Document } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
