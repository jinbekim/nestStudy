import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IdPwDto } from './dto/idpw.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('all_users')
  getUsers() {
    return this.authService.getUsers();
  }

  @Post('sign_up')
  signUp(@Body(ValidationPipe) idPwDto: IdPwDto) {
    return this.authService.signUp(idPwDto);
  }

  @Post('sign_in')
  signIn(@Body(ValidationPipe) idPwDto: IdPwDto): { accessToken: string } {
    return this.authService.signIn(idPwDto);
  }
  @Post('oauth')
  getToken(@Body() code: { code: string }) {
    return this.authService.getToken(code.code);
  }
}
