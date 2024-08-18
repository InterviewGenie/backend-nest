import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interview } from './schema/interview.schema';
import { Feedback } from './schema/feedback.schema';
import { Model, ObjectId, UpdateWriteOpResult } from 'mongoose';
import {
  FeedbackInterviewDto,
  InterviewDto,
} from 'src/shared/dto/interview.dto';
import { User } from 'src/users/schema/user.schema';
import { HelpMeDto } from 'src/shared/dto/help.dto';
import { groq, InterviewStatusType } from 'src/shared/constant';

@Injectable()
export class InterviewService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<Interview>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  async getInterviews(userId: ObjectId): Promise<Interview[]> {
    const { interviews } = await this.userModel
      .findById(userId)
      .populate('interviews')
      .exec();
    return interviews.filter(
      (interview) => interview.status === InterviewStatusType.Initiated,
    );
  }

  async startInterview(
    userId: ObjectId,
    interviewId: ObjectId,
  ): Promise<Interview> {
    const user = await this.userModel.findById(userId);
    const interview = await this.interviewModel.findOne({
      _id: interviewId,
      interviewee: user,
    });
    user.activeInterview = interview;
    user.save();
    interview.status = InterviewStatusType.Started;
    return interview.save();
  }

  async finishInterview(
    userId: ObjectId,
    interviewId: ObjectId,
  ): Promise<Interview> {
    const interview = await this.interviewModel.findOne({
      _id: interviewId,
      interviewee: userId,
    });
    interview.status = InterviewStatusType.Finished;
    return interview.save();
  }

  async deleteInterview(
    userId: ObjectId,
    interviewId: ObjectId,
  ): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }> {
    await this.userModel.updateOne(
      { _id: userId },
      { $pull: { interviews: interviewId } },
    );
    return await this.interviewModel.deleteOne({
      _id: interviewId,
      interviewee: userId,
    });
  }

  async feedbackInterview(
    userId: ObjectId,
    feedbackInterviewDto: FeedbackInterviewDto,
  ): Promise<Interview> {
    const user = await this.userModel.findById(userId);
    const interview = await this.interviewModel.findOne({
      _id: feedbackInterviewDto._id,
      interviewee: user,
    });
    interview.feedback = new this.feedbackModel({
      rating: feedbackInterviewDto.rating,
      text: feedbackInterviewDto.text,
    });
    interview.status = InterviewStatusType.Archived;
    user.activeInterview = null;
    user.save();
    return interview.save();
  }

  async create(
    interviewDto: InterviewDto,
    userId: ObjectId,
  ): Promise<Interview> {
    const newInterview = new this.interviewModel(interviewDto);
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.interviews.push(newInterview);
    newInterview.interviewee = user;
    await user.save();
    return newInterview.save();
  }

  async update(
    userId: ObjectId,
    interviewId: ObjectId,
    interviewData: InterviewDto,
  ): Promise<UpdateWriteOpResult> {
    return await this.interviewModel.updateOne(
      { _id: interviewId, interviewee: userId },
      {
        ...interviewData,
      },
    );
  }

  async helpMe(helpMeDto: HelpMeDto, userId: ObjectId): Promise<string> {
    console.log(userId);
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: helpMeDto.query,
        },
      ],
      model: 'llama3-8b-8192',
    });

    return completion.choices[0].message.content;

    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a helpful assistant." }],
    //   model: "gpt-4o-mini",
    // });

    // return completion.choices[0].message.content;
  }
}
