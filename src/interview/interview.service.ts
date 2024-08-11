import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interview } from './schema/interview.schema';
import { Model } from 'mongoose';
import { InterviewDto } from 'src/shared/dto/interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<Interview>,
  ) {}

  async create(interviewDto: InterviewDto): Promise<Interview> {
    const createdUser = new this.interviewModel(interviewDto);
    return createdUser.save();
  }
}
