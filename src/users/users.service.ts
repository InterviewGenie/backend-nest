import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUserDto } from 'src/shared/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async getUser(userId: ObjectId): Promise<any> {
    /* eslint-disable */
    const { __v, password, interviews, ...result } = (
      await this.userModel.findById(userId)
    ).toObject();
    /* eslint-enable */
    return result;
  }

  async signUp(signUpDto: AuthUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: signUpDto.email,
    });

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(signUpDto);
    return createdUser.save();
  }
}
