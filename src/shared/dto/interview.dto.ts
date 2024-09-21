import { ObjectId } from 'mongoose';
import { Lanauge, InterviewType, InterviewStatusType } from '../constant';

export class InterviewDto {
  senario: InterviewType;
  position: string;
  company: string;
  language: Lanauge;
  schedule: Date;
  cv: string;
  instruction: string;
  keywords: string[];
  status: InterviewStatusType;
}

export class FeedbackInterviewDto {
  _id: ObjectId;
  rating: number;
  text?: string;
}

export class InterviewScriptDto {
  speaker: string;
  script: string;
}
