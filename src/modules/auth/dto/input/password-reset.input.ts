import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class PasswordResetInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  resetToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  confirmPassword: string;
}
