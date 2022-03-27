import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  getAllUsers() {
    return this.userService.findAll();
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const user = this.userService.findByEmail(authCredentialDto.email);
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
    const user = this.userService.findByEmail(email);
    if (user) throw new UnauthorizedException('Email already exists');
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(authCredentialDto.password, salt);
    password = hash;
    this.userService.create({
      id: uuidv4(),
      email,
      password,
    });
  }
}
