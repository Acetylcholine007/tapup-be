import { ApiProperty } from '@nestjs/swagger';

export class MessageOutput {
  @ApiProperty()
  message: string;
}
