import { IsNotEmpty, IsString } from 'class-validator';

export class SignInLocalInput {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
