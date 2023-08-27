import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { BaseChangePasswordInput } from './base-change-password.input';

export class ResetPasswordInput extends BaseChangePasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  resetToken: string;
}
