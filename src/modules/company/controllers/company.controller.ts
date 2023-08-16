import { CurrentUser } from '@common/decorators/current-user.decorator';
import { PaginationInput } from '@common/dto/input/pagination.input';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyInput } from '../dtos/inputs/create-company.input';
import { UpdateCompanyP13NInput } from '../dtos/inputs/update-company-p13n.input';
import { UpdateCompanyInput } from '../dtos/inputs/update-company.input';
import { CompanyService } from '../services/company.service';

@ApiTags('Companies')
@ApiBearerAuth()
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanies(@Query() paginationQuery: PaginationInput) {
    return this.companyService.getCompanies(paginationQuery);
  }

  @Get('/mine')
  getMyCompanies(@CurrentUser('id') userId: string) {
    return this.companyService.getMyCompanies(userId);
  }

  @Get('/:companyId')
  getCompany(@Param('companyId') companyId: string) {
    return this.companyService.getCompany(companyId);
  }

  @Post()
  createCompany(@Body() createCompanyInput: CreateCompanyInput) {
    return this.companyService.createCompany(createCompanyInput);
  }

  @Patch('/personalization/:companyId')
  updateCompanyP13N(
    @Param('companyId') companyId: string,
    @Body() updateCompanyP13NInput: UpdateCompanyP13NInput
  ) {
    return this.companyService.updateCompanyP13n(
      companyId,
      updateCompanyP13NInput
    );
  }

  // @Roles(Role.ADMIN)
  @Patch('/verify/:companyId')
  verifyCompany(@Param('companyId') companyId: string) {
    return this.companyService.verifyCompany(companyId);
  }

  @Patch('/:companyId')
  updateCompany(
    @Param('companyId') companyId: string,
    @Body() updateCompanyInput: UpdateCompanyInput
  ) {
    return this.companyService.updateCompany(companyId, updateCompanyInput);
  }

  @Delete('/:companyId')
  deleteCompany(@Param('companyId') companyId: string) {
    return this.companyService.deleteCompany(companyId);
  }
}
