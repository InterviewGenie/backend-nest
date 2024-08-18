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
import {
  FeedbackInterviewDto,
  InterviewDto,
} from 'src/shared/dto/interview.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelpMeDto } from 'src/shared/dto/help.dto';
import { ObjectId } from 'mongoose';

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
  @Post('update')
  updateInterview(
    @Request() req,
    @Body() interviewDto: { _id: ObjectId; data: InterviewDto },
  ) {
    return this.interviewService.update(
      req.user._id,
      interviewDto._id,
      interviewDto.data,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('get')
  getInterview(@Request() req) {
    return this.interviewService.getInterviews(req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('start')
  startInterview(@Request() req, @Body() interview: { _id: ObjectId }) {
    return this.interviewService.startInterview(req.user._id, interview._id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('finish')
  finishInterview(@Request() req, @Body() interview: { _id: ObjectId }) {
    return this.interviewService.finishInterview(req.user._id, interview._id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('delete')
  deleteInterview(@Request() req, @Body() interview: { _id: ObjectId }) {
    return this.interviewService.deleteInterview(req.user._id, interview._id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('feedback')
  feedbackInterview(
    @Request() req,
    @Body() feedbackInterviewDto: FeedbackInterviewDto,
  ) {
    return this.interviewService.feedbackInterview(
      req.user._id,
      feedbackInterviewDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('help-me')
  helpMe(@Request() req, @Body() helpMeDto: HelpMeDto) {
    return this.interviewService.helpMe(helpMeDto, req.user._id);
  }
}
