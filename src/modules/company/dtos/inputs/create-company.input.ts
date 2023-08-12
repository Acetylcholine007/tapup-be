import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UpdateCompanyInput } from './update-company.input';

export class CreateCompanyInput extends UpdateCompanyInput {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
