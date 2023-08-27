import { BaseCreateUserInput } from '@modules/user/dtos/input/base-create-user.input';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterLocalInput extends BaseCreateUserInput {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
