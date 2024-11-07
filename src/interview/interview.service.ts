import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interview } from './schema/interview.schema';
import { Model, ObjectId } from 'mongoose';
import {
  FeedbackInterviewDto,
  InterviewDto,
  InterviewSpeechDto,
} from 'src/shared/dto/interview.dto';
import { User } from 'src/users/schema/user.schema';
import { HelpMeDto } from 'src/shared/dto/help.dto';
import { groq, InterviewStatusType } from 'src/shared/constant';

@Injectable()
export class InterviewService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<Interview>,
    @InjectModel(User.name) private userModel: Model<User>,
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
    interviewLink: string,
  ): Promise<Interview> {
    const user = await this.userModel.findById(userId);
    const interview = await this.interviewModel.findOne({
      _id: interviewId,
      interviewee: user,
    });
    user.activeInterview = interview;
    user.save();
    interview.status = InterviewStatusType.Started;
    interview.link = interviewLink;
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
    feedbackInterview: {
      interviewId: ObjectId;
      feedback: FeedbackInterviewDto;
    },
  ): Promise<Interview> {
    const user = await this.userModel.findById(userId);
    const interview = await this.interviewModel.findOne({
      _id: feedbackInterview.interviewId,
      interviewee: user,
    });
    interview.feedback = feedbackInterview.feedback;
    interview.status = InterviewStatusType.Archived;
    user.activeInterview = null;
    user.save();
    return interview.save();
  }

  async upsert(userId: ObjectId, interview: InterviewDto): Promise<Interview> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (interview._id) {
      // Update the existing interview
      const updatedInterview = await this.interviewModel.findOneAndUpdate(
        { _id: interview._id, interviewee: userId },
        { ...interview },
        { new: true }, // Returns the updated document
      );

      if (!updatedInterview) {
        throw new NotFoundException('Interview not found');
      }
      return updatedInterview;
    } else {
      // Create a new interview if no _id is provided
      const newInterview = new this.interviewModel(interview);
      user.interviews.push(newInterview);
      newInterview.interviewee = user;
      await user.save();
      return newInterview.save();
    }
  }

  async helpMe(helpMe: HelpMeDto, userId: ObjectId): Promise<string[]> {
    console.log('userId', userId);
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: helpMe.query,
        },
      ],
      model: 'llama3-8b-8192',
    });

    return [completion.choices[0].message.content];

    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a helpful assistant." }],
    //   model: "gpt-4o-mini",
    // });

    // return completion.choices[0].message.content;
  }

  async saveSpeech(
    speech: InterviewSpeechDto,
    userId: ObjectId,
  ): Promise<{ success: boolean }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found'); // Handle user not found case
    }
    const activeInterview = await this.interviewModel.findById(
      user.activeInterview,
    );
    if (activeInterview) {
      activeInterview.script.push(speech);
    } else {
      return { success: false };
    }
    await activeInterview.save();
    return { success: true };
  }
}
