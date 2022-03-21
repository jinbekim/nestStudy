import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FtStrategy } from './ft-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, FtStrategy],
})
export class AuthModule {}
