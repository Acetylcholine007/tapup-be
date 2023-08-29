import cryptoConfig from '@config/crypto.config';
import jwtConfig from '@config/jwt.config';
import { UserEntity } from '@entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import * as crypto from 'crypto';
import { authenticator } from 'otplib';
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
    @Inject(cryptoConfig.KEY)
    private readonly cryptoConfiguration: ConfigType<typeof cryptoConfig>,
    private readonly configService: ConfigService,
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

  async generateTFASecret(email: string) {
    const secret = authenticator.generateSecret();
    const appName = this.configService.get<string>('tfaAppName');
    const uri = authenticator.keyuri(email, appName, secret);
    return { uri, secret };
  }

  async encryptSymmetric(data: string) {
    const translatedKey = Buffer.from(
      this.cryptoConfiguration.symmetricKey,
      'base64'
    );
    const ivBuffer = Buffer.from(this.cryptoConfiguration.iv, 'base64');

    const cipher = crypto.createCipheriv('aes256', translatedKey, ivBuffer);
    return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
  }

  async decryptSymmetric(data: string) {
    const translatedKey = Buffer.from(
      this.cryptoConfiguration.symmetricKey,
      'base64'
    );
    const ivBuffer = Buffer.from(this.cryptoConfiguration.iv, 'base64');

    const decipher = crypto.createDecipheriv('aes256', translatedKey, ivBuffer);
    return decipher.update(data, 'base64', 'utf-8') + decipher.final('utf8');
  }

  async verifyCode(code: string, secret: string) {
    return authenticator.verify({
      token: code,
      secret,
    });
  }
}
