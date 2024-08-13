import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { Interview, InterviewSchema } from './schema/interview.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewController } from './interview.controller';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
