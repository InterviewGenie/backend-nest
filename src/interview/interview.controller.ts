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
  InterviewSpeechDto,
} from 'src/shared/dto/interview.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HelpMeDto } from 'src/shared/dto/help.dto';
import { ObjectId } from 'mongoose';

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('upsert')
  createInterview(@Request() req, @Body() interviewDto: InterviewDto) {
    return this.interviewService.upsert(req.user._id, interviewDto);
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
  startInterview(
    @Request() req,
    @Body() interview: { _id: ObjectId; link: string },
  ) {
    return this.interviewService.startInterview(
      req.user._id,
      interview._id,
      interview.link,
    );
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
    @Body()
    feedbackInterviewDto: {
      interviewId: ObjectId;
      feedback: FeedbackInterviewDto;
    },
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

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('speech')
  saveSpeech(@Request() req, @Body() speechDto: InterviewSpeechDto) {
    return this.interviewService.saveSpeech(speechDto, req.user._id);
  }
}
