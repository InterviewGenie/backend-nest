import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interview } from './schema/interview.schema';
import { Model, ObjectId } from 'mongoose';
import { InterviewDto } from 'src/shared/dto/interview.dto';
import { User } from 'src/users/schema/user.schema';

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
}
