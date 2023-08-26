import { BaseCreateUserInput } from '@modules/user/dtos/input/base-create-user.input';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterLocalInput extends BaseCreateUserInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
