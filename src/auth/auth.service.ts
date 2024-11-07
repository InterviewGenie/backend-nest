import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from 'src/shared/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthPayload> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // const {password, ...result} = user;
    // return result;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { _id: user._id, email: user.email };
    return {
      ...payload,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
