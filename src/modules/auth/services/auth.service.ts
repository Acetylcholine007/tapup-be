import googleConfig from '@config/google.config';
import jwtConfig from '@config/jwt.config';
import { UserEntity } from '@entities/user.entity';
import { CryptoService } from '@modules/crypto/services/crypto.service';
import { MailService } from '@modules/mail/services/mail.service';
import { UserService } from '@modules/user/services/user.service';
import {
  ConflictException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { google } from 'googleapis';
import { Profile } from 'passport-google-oauth20';
import { OAuthStateInput } from '../dto/input/oauth-state.input';
import { RegisterLocalInput } from '../dto/input/register-local.input';
import { SendVerificationInput } from '../dto/input/send-verification.input';
import { TokenOutput } from '../dto/output/token.output';
import { VerifyOutput } from '../dto/output/verify.output';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(googleConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleConfig>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService
  ) {}

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
      emails: [{ value: email, verified }],
      photos: [{ value: profileUrl }],
      id,
    } = profile;

    const isVerified =
      typeof verified === 'boolean'
        ? (verified as boolean)
        : verified === 'true';

    try {
      const user = await this.userService.getUser(email, 'email');
      if (user.isVerified) return user;
      return this.userService.verifyUser(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.createUser({
          email,
          googleId: id,
          firstName: givenName,
          lastName: familyName,
          profileUrl: profileUrl,
          isVerified,
        });
        return user;
      }
      throw new UnauthorizedException();
    }
  }

  async signInGoogleUrl(oAuthStateInput: OAuthStateInput) {
    return this.createOAuthClient().generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email', 'openid'],
      state: JSON.stringify(oAuthStateInput),
    });
  }

  async signIn(user: UserEntity): Promise<TokenOutput> {
    return this.cryptoService.generateTokens(user);
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

    return this.cryptoService.generateTokens(user);
  }

  async sendVerificationEmail(
    user: UserEntity,
    sendVerificationInput: SendVerificationInput
  ): Promise<VerifyOutput> {
    const verifyToken = await this.cryptoService.signToken(
      user.id,
      this.jwtConfiguration.verifyTokenTtl,
      {
        email: user.email,
        verify: true,
        destination:
          sendVerificationInput.destination ??
          this.configService.get<string>('frontendUrl'),
      }
    );
    if (user.isVerified)
      throw new MethodNotAllowedException('Your account is already verified.');
    if (!user.password)
      throw new MethodNotAllowedException(
        'Sending verification is only allowed for locally registered accounts. If you are using social account, verify your account through your provider and re sign in to the app.'
      );
    await this.mailService.sendVerificationEmail(user.email, verifyToken);
    return { message: `Account verification link sent to ${user.email}` };
  }

  async verifyAccount(user: UserEntity) {
    //TODO: Add proper redirection for this in the future
    if (!user.password)
      throw new MethodNotAllowedException(
        'Email verification is only allowed for locally registered accounts. If you are using social account, verify your account through your provider and re sign in to the app.'
      );
    if (user.isVerified) return user;
    return this.userService.verifyUser(user);
  }
}
