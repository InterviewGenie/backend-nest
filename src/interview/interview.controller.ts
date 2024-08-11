import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewDto } from 'src/shared/dto/interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createInterview(@Body() interviewDto: InterviewDto) {
    return this.interviewService.create(interviewDto);
  }
}
