import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  verifyToken: string;
}
