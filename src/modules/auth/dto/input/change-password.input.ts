import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseChangePasswordInput } from './base-change-password.input';

export class ChangePasswordInput extends BaseChangePasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
