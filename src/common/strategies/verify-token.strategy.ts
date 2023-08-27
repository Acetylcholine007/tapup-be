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
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { VerifyTokenPayload } from 'src/data/interfaces/auth.interface';

@Injectable()
export class VerifyTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-verify'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly usersService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('verifyToken'),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
      issuer: jwtConfiguration.issuer,
      audience: jwtConfiguration.audience,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: VerifyTokenPayload) {
    if (!payload.verify || !payload.destination)
      throw new BadRequestException('Invalid verify token');
    const user = await this.usersService.getUser(payload.sub);
    if (!user) throw new UnauthorizedException();
    req.redirectTo = payload.destination;
    return user;
  }
}
