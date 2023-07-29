import { AccessTokenStrategy } from '@common/strategies/access-token.strategy';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { RefreshTokenStrategy } from '@common/strategies/refresh-token.strategy';
import jwtConfig from '@config/jwt.config';
import { CryptoModule } from '@modules/crypto/crypto.module';
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
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
