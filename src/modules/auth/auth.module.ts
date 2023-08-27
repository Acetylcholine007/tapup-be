import { VerifyUserExceptionFilter } from '@common/filters/verify-user-exception/verify-user-exception.filter';
import { AccessTokenStrategy } from '@common/strategies/access-token.strategy';
import { GoogleStrategy } from '@common/strategies/google.strategy';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { RefreshTokenStrategy } from '@common/strategies/refresh-token.strategy';
import { VerifyTokenStrategy } from '@common/strategies/verify-token.strategy';
import googleConfig from '@config/google.config';
import jwtConfig from '@config/jwt.config';
import { CryptoModule } from '@modules/crypto/crypto.module';
import { MailModule } from '@modules/mail/mail.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UserModule,
    CryptoModule,
    PassportModule,
    MailModule,
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(googleConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    VerifyTokenStrategy,
    GoogleStrategy,
    VerifyUserExceptionFilter,
  ],
  exports: [AuthService],
})
export class AuthModule {}
