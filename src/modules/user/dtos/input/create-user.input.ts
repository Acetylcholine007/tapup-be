import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseCreateUserInput } from './base-create-user.input';

export class CreateUserInput extends BaseCreateUserInput {
  @ApiProperty()
  @IsOptional()
  @IsString()
  googleId?: string;
}
