import { IsNotEmpty, IsString } from 'class-validator';
import { BaseChangePasswordInput } from './base-change-password.input';

export class ChangePasswordInput extends BaseChangePasswordInput {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
