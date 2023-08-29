import { Role } from '@enums/user.enum';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  profileUrl?: string;

  @IsOptional()
  @IsString()
  telNo?: string;

  @IsOptional()
  @IsString()
  viber?: string;

  @IsOptional()
  @IsString()
  whatsUp?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
