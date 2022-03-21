import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('42_CLIENT_ID'),
      clientSecret: configService.get<string>('42_CLIENT_SECRET'),
      callbackURL: configService.get<string>('42_CALLBACK_URL'),
      passReqToCallback: true,
      profileFields: {
        id: function (obj) {
          // 'id'
          return obj.id;
        },
        username: 'login',
        image_url: 'image_url',
      },
    });
  }

  validate(req, at, rt, profile, cb) {
    console.log(profile);
    cb(null, profile);
  }
}
