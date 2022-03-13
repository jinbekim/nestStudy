import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('sign-in')
  signIn(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
