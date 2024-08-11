import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUserDto } from 'src/shared/dto/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  signIn(@Body() signUpDto: AuthUserDto) {
    return this.usersService.create(signUpDto);
  }
}
