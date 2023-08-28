import { IsMimeType, IsNotEmpty, IsString } from 'class-validator';

export class PresignedUrlInput {
  @IsNotEmpty()
  @IsString()
  @IsMimeType()
  mimeType: string;
}
