import { Role } from '@enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
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
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

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
