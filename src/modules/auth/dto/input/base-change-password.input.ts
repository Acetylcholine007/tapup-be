import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export abstract class BaseChangePasswordInput {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  newPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  confirmPassword: string;
}
