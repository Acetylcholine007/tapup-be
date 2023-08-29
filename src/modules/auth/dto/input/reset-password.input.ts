import { IsJWT, IsNotEmpty } from 'class-validator';
import { BaseChangePasswordInput } from './base-change-password.input';

export class ResetPasswordInput extends BaseChangePasswordInput {
  @IsNotEmpty()
  @IsJWT()
  resetToken: string;
}
