import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { IdPwDto } from './dto/idpw.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class AuthService {
  private users: UserEntity[] = [];

  getUsers(): UserEntity[] {
    return this.users;
  }

  signUp(signUpDto: IdPwDto) {
    const { userId, userPassword } = signUpDto;
    for (let i = 0; i < this.users.length; i++) {
      if (userId === this.users[i].userId)
        throw new HttpException('hello', 405);
    }
    this.users.push({
      id: this.users.length + 1,
      userId: userId,
      userPassword: userPassword,
    });
  }

  signIn(signInDto: IdPwDto): string {
    const { userId, userPassword } = signInDto;
    for (let i = 0; i < this.users.length; i++) {
      if (
        userId === this.users[i].userId &&
        userPassword === this.users[i].userPassword
      ) {
        return `${userId}님 환영합니다!`;
      }
    }
    return `로그인에 실패하였습니다.`;
  }
}
