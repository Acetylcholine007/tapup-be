import { IsNotEmpty } from 'class-validator';
import { UpdateCompanyInput } from './update-company.input';

export class CreateCompanyInput extends UpdateCompanyInput {
  @IsNotEmpty()
  name: string;
}
