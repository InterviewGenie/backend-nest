import { ObjectId } from 'mongoose';
import { Lanauge, InterviewType, InterviewStatusType } from '../constant';

export class InterviewDto {
  _id?: ObjectId;
  senario: InterviewType;
  position: string;
  company: string;
  language: Lanauge;
  time: Date;
  cv: string;
  jd: string;
  keywords: string[];
  status: InterviewStatusType;
}

export class FeedbackInterviewDto {
  rating: number;
  text?: string;
}

export class InterviewSpeechDto {
  isMe: boolean;
  speaker: string;
  speech: string;
}
