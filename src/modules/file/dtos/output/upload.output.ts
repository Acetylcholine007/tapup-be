import { ApiProperty } from '@nestjs/swagger';

export class UploadOutput {
  @ApiProperty()
  fileUrl: string;
}
