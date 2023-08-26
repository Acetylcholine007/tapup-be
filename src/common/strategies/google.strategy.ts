import googleConfig from '@config/google.config';
import { AuthService } from '@modules/auth/services/auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleConfig>,
    private readonly authService: AuthService
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.secret,
      callbackURL: googleConfiguration.callback,
      scope: ['profile', 'email', 'openid'],
      passReqToCallback: true,
      accessType: 'offline',
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ) {
    return this.authService.validateGoogle(accessToken, refreshToken, profile);
  }
}
