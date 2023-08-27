import { ApiProperty } from '@nestjs/swagger';

export class VerifyOutput {
  @ApiProperty()
  message: string;
}
