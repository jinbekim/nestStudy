import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FtGuard } from './42.guard';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() Body, @Body() authCredentialDto: AuthCredentialDto) {
    console.log('body', Body);
    return this.authService.signUp(authCredentialDto);
  }

  @Post('sign-in')
  signIn(
    @Body() Body,
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    console.log('body', Body);
    return this.authService.signIn(authCredentialDto);
  }

  @UseGuards(FtGuard)
  @Get('oauth')
  oauth() {}

  @UseGuards(FtGuard)
  @Get('login/return')
  async loginReturn(@Req() req, @Res() res) {
    const token = this.authService.signToken(req.user.username);
    res.cookie('access_token', (await token).accessToken);
    res.redirect('http://localhost:3000/'); // 요청한 페이지로 리다이렉트 해주는게 맞지 않을까?
    // 왜냐면 우리 서비스가 하나의 프론트에 종속적이게 되게 되니까.
    // 모바일 어플리케이션이나 웹사이트나 똑같이 작동했으면 좋겠는데.
    /*
     ** 이렇게 쿠키를 넘겨주는게 맞는가? -> 바로 셋 해주는게 맞을 수도 있겠다 싶은게 http only 옵션
     ** storage에 저장하려면 또 다르겠죠.
     ** 이렇게 리다이렉트를 해주는게 맞는가?
     ** front에서 요청은 어떠한가?
     ** 모든 프로세스를 백에서 해주는게 맞는가?
     ** jwt 인가는 어떻게 할것인가? -> 어쨌든 로그인 하면 토큰을 받으니까 다음 요청때 올것이고.
     */
  }

  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
