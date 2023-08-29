import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BaseCreateUserInput } from './base-create-user.input';

export class CreateUserInput extends BaseCreateUserInput {
  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
