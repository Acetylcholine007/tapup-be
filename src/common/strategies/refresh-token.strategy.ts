import jwtConfig from '@config/jwt.config';
import { UserService } from '@modules/user/services/user.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from 'src/data/interfaces/auth.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly usersService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
      issuer: jwtConfiguration.issuer,
      audience: jwtConfiguration.audience,
    });
  }

  async validate(payload: RefreshTokenPayload) {
    if (!payload.refresh)
      throw new BadRequestException('Invalid refresh token');
    const user = await this.usersService.getUser(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
