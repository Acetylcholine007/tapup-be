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
import { ResetTokenPayload } from 'src/data/interfaces/auth.interface';

@Injectable()
export class ResetTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-reset'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly usersService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('resetToken'),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
      issuer: jwtConfiguration.issuer,
      audience: jwtConfiguration.audience,
    });
  }

  async validate(payload: ResetTokenPayload) {
    if (!payload.reset) throw new BadRequestException('Invalid reset token');
    const user = await this.usersService.getUser(payload.email, 'email');
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
