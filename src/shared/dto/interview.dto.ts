import { Lanauge, InterviewType } from '../constant';

export class InterviewDto {
  senario: InterviewType;
  position: string;
  company: string;
  language: Lanauge;
  schedule: Date;
  cv: string;
  instruction: string;
  keywords: string[];
}
