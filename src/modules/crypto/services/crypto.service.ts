import jwtConfig from '@config/jwt.config';
import { UserEntity } from '@entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from 'src/data/interfaces/auth.interface';

@Injectable()
export class CryptoService {
  private readonly jwtSignOptions: JwtSignOptions;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {
    this.jwtSignOptions = {
      audience: jwtConfiguration.audience,
      issuer: jwtConfiguration.issuer,
      secret: jwtConfiguration.secret,
    };
  }

  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }

  async signSublessToken<T extends object>(expiresIn: number, payload?: T) {
    return this.jwtService.signAsync(payload, {
      ...this.jwtSignOptions,
      expiresIn,
    });
  }

  async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return this.jwtService.signAsync(
      { sub: userId, ...payload },
      { ...this.jwtSignOptions, expiresIn }
    );
  }

  async generateTokens(user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<AccessTokenPayload>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
        }
      ),
      this.signToken<Partial<RefreshTokenPayload>>(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
        {
          refresh: true,
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
