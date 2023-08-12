import { CompanyEntity } from '@entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateCompanyP13NInput } from './create-company-p13n.input';

export class UpdateCompanyInput
  implements Partial<Omit<CompanyEntity, 'id' | 'personalization'>>
{
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateCompanyP13NInput)
  @ValidateNested()
  personalization?: CreateCompanyP13NInput;
}
