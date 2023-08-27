import { Role } from '@enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export abstract class BaseCreateUserInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(8)
  @MaxLength(16)
  password?: string;

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
}
