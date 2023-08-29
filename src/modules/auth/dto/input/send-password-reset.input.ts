import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendPasswordResetInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
