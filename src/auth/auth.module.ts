import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forRoot(
      'mongodb+srv://michaeledy623:IstaBONiANce@interview-genie.zbvdc.mongodb.net/?retryWrites=true&w=majority&appName=interview-genie',
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
