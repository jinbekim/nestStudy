import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users: AuthCredentialDto[] = [];

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
    const payload = {
      email: authCredentialDto.email,
    };
    const token = this.jwtService.sign(payload);
    return Promise.resolve({ accessToken: token });
  }

  signUp(authCredentialDto: AuthCredentialDto) {
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(authCredentialDto.password, salt);
    authCredentialDto.password = hash;
    this.users.push(authCredentialDto);
  }
}
