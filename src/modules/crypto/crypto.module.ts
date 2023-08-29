import cryptoConfig from '@config/crypto.config';
import jwtConfig from '@config/jwt.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './services/crypto.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(cryptoConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
