import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignInLocalInput {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  //TODO: Remove TFA Code in here and move it on a new TFAInput dto
  @IsOptional()
  @IsNumberString()
  tfaCode?: string;
}
