<<<<<<< HEAD
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  getAllUsers() {
    return this.users;
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const user = this.users.find(
      (user) => user.email === authCredentialDto.email,
    );
    if (!user)
      throw new UnauthorizedException('Email or password is incorrect');
    if (!bcrypt.compareSync(authCredentialDto.password, user.password))
      throw new UnauthorizedException('Email or password is incorrect');
    return this.signToken(user.email);
  }
  async signToken(email: string): Promise<{ accessToken: string }> {
    const payload = {
      email,
    };
    const token = this.jwtService.sign(payload);
    return Promise.resolve({ accessToken: token });
  }

  signUp(authCredentialDto: AuthCredentialDto) {
    let { email, password } = authCredentialDto;
    const user = this.users.find((user) => user.email === email);
    if (user) throw new UnauthorizedException('Email already exists');
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(authCredentialDto.password, salt);
    password = hash;
    this.users.push({
      id: this.users.length + 1,
      email,
      password,
    });
  }
=======
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
>>>>>>> main
}
