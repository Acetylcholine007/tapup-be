import { CompanyPersonalizationEntity } from '@entities/company-p13n.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyP13NInput
  implements Partial<Omit<CompanyPersonalizationEntity, 'id' | 'company'>>
{
  @ApiProperty()
  @IsOptional()
  @IsString()
  companyTextColor?: string;
}
