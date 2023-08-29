import { UserEntity } from '@entities/user.entity';
import { CryptoService } from '@modules/crypto/services/crypto.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/data/constants/auth.constants';

@Injectable()
export class TFAGuard implements CanActivate {
  constructor(private readonly cryptoService: CryptoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user: UserEntity = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];

    const tfaCode: string = context.switchToHttp().getRequest().body.tfaCode;

    if (!user.isTfaEnabled) return true;

    const decryptedSecret = await this.cryptoService.decryptSymmetric(
      user.tfaSecret
    );

    return this.cryptoService.verifyCode(tfaCode, decryptedSecret);
  }
}
