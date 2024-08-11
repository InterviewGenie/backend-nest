import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { Interview, InterviewSchema } from './schema/interview.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewController } from './interview.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
    ]),
  ],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
