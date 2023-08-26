import googleConfig from '@config/google.config';
import jwtConfig from '@config/jwt.config';
import { UserEntity } from '@entities/user.entity';
import { CryptoService } from '@modules/crypto/services/crypto.service';
import { UserService } from '@modules/user/services/user.service';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { google } from 'googleapis';
import { Profile } from 'passport-google-oauth20';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from 'src/data/interfaces/auth.interface';
import { OAuthStateInput } from '../dto/input/oauth-state.input';
import { RegisterLocalInput } from '../dto/input/register-local.input';
import { TokenOutput } from '../dto/output/token.output';

@Injectable()
export class AuthService {
  private readonly jwtSignOptions: JwtSignOptions;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(googleConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleConfig>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService
  ) {
    this.jwtSignOptions = {
      audience: jwtConfiguration.audience,
      issuer: jwtConfiguration.issuer,
      secret: jwtConfiguration.secret,
    };
  }

  createOAuthClient() {
    const oauth2Client = new google.auth.OAuth2(
      this.googleConfiguration.clientId,
      this.googleConfiguration.secret,
      this.googleConfiguration.callback
    );
    return oauth2Client;
  }

  async validateLocal(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.getUser(email, 'email');

    if (user && (await this.cryptoService.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async validateGoogle(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<UserEntity> {
    const {
      name: { familyName, givenName },
      emails: [{ value: email }],
      photos: [{ value: profileUrl }],
      id,
    } = profile;

    try {
      return await this.userService.getUser(email, 'email');
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.createUser({
          email,
          googleId: id,
          firstName: givenName,
          lastName: familyName,
          profileUrl: profileUrl,
        });
        return user;
      }
      throw new UnauthorizedException();
    }
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

  async refreshTokens(user: UserEntity) {
    return this.generateTokens(user);
  }

  async signInGoogleUrl(oAuthStateInput: OAuthStateInput) {
    return this.createOAuthClient().generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email', 'openid'],
      state: JSON.stringify(oAuthStateInput),
    });
  }

  async signIn(user: UserEntity): Promise<TokenOutput> {
    return this.generateTokens(user);
  }

  async registerLocal(registerInput: RegisterLocalInput): Promise<TokenOutput> {
    let existingUser: UserEntity;
    try {
      existingUser = await this.userService.getUser(
        registerInput.email,
        'email'
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        existingUser = undefined;
      }
    }

    if (existingUser) throw new ConflictException('Email already exists');

    const { password, ...userData } = registerInput;
    const hashedPassword = await this.cryptoService.hash(password);

    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }
}
