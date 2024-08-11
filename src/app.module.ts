import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [AuthModule, UsersModule, InterviewModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
