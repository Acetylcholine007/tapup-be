import { CompanyPersonalizationEntity } from '@entities/company-p13n.entity';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyP13NInput
  implements Partial<Omit<CompanyPersonalizationEntity, 'id' | 'company'>>
{
  @IsOptional()
  @IsString()
  companyTextColor?: string;
}
