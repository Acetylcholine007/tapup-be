import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export abstract class BaseChangePasswordInput {
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
