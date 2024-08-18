import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUserDto } from 'src/shared/dto/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  signIn(@Body() signUpDto: AuthUserDto) {
    return this.usersService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('get')
  getUser(@Request() req) {
    return this.usersService.getUser(req.user._id);
  }
}
