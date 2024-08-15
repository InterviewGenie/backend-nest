import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interview } from './schema/interview.schema';
import { Model, ObjectId } from 'mongoose';
import { InterviewDto } from 'src/shared/dto/interview.dto';
import { User } from 'src/users/schema/user.schema';
import { HelpMeDto } from 'src/shared/dto/help.dto';
import { groq } from 'src/shared/constant';

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
    return interviews;
  }

  async create(
    interviewDto: InterviewDto,
    userId: ObjectId,
  ): Promise<Interview> {
    const createdInterview = new this.interviewModel(interviewDto);
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.interviews.push(createdInterview);
    await user.save();
    return createdInterview.save();
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
