import { ForbiddenException, Injectable } from '@nestjs/common';
import { IdPwDto } from './dto/idpw.dto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private users: UserEntity[] = [];

  getUsers(): UserEntity[] {
    return this.users;
  }

  async signUp(signUpDto: IdPwDto) {
    const { userId, userPassword } = signUpDto;
    this.users.map((user) => {
      if (user.userId === userId) {
        throw new ForbiddenException();
      }
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    this.users.push({
      id: this.users.length + 1,
      userId: userId,
      userPassword: hashedPassword,
    });
  }

  signIn(signInDto: IdPwDto): { accessToken: string } {
    const { userId, userPassword } = signInDto;
    let returnValue: string = '';

    for (let i = 0; i < this.users.length; i++) {
      if (
        userId === this.users[i].userId &&
        bcrypt.compare(userPassword, this.users[i].userPassword)
      ) {
        const payload = { userId };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken: accessToken };
      }
    }
  }
  async getToken(code: string) {
    const response = await axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'authorization_code',
      client_id: this.configService.get<string>('CLIENT_ID'),
      client_secret: this.configService.get<string>('CLIENT_SECRET'),
      code: code,
      redirect_uri: 'http://localhost:3000/loading',
    });
    const ftToken = response.data.access_token;
    console.log(ftToken);
  }
}
