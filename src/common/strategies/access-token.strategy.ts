import jwtConfig from '@config/jwt.config';
import { UserService } from '@modules/user/services/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from 'src/data/interfaces/auth.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly usersService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
      issuer: jwtConfiguration.issuer,
      audience: jwtConfiguration.audience,
    });
  }

  async validate(payload: AccessTokenPayload) {
    if (!payload.email) throw new UnauthorizedException();
    const user = await this.usersService.getUser(payload.email, 'email');
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
