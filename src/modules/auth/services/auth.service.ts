import jwtConfig from '@config/jwt.config';
import { UserEntity } from '@entities/user.entity';
import { CryptoService } from '@modules/crypto/services/crypto.service';
import { UserService } from '@modules/user/services/user.service';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from 'src/data/interfaces/auth.interface';
import { RegisterLocalInput } from '../dto/input/register-local.input';
import { TokenOutput } from '../dto/output/token.output';

@Injectable()
export class AuthService {
  private readonly jwtSignOptions: JwtSignOptions;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email, 'email');

    if (user && (await this.cryptoService.compare(password, user.password))) {
      return user;
    }
    return null;
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

  async signInLocal(user: UserEntity): Promise<TokenOutput> {
    return await this.generateTokens(user);
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
