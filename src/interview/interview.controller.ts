import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewDto } from 'src/shared/dto/interview.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('create')
  createInterview(@Request() req, @Body() interviewDto: InterviewDto) {
    return this.interviewService.create(interviewDto, req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('get')
  getInterview(@Request() req) {
    return this.interviewService.getInterviews(req.user._id);
  }
}
