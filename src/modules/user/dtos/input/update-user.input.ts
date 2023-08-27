import { Role } from '@enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserInput {
  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  profileUrl?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  telNo?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  viber?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  whatsUp?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
