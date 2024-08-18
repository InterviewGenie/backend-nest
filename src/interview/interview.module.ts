import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { Interview, InterviewSchema } from './schema/interview.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewController } from './interview.controller';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Feedback, FeedbackSchema } from './schema/feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
      { name: User.name, schema: UserSchema },
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
