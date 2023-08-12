import { PaginationInput } from '@common/dto/input/pagination.input';
import { CompanyPersonalizationEntity } from '@entities/company-p13n.entity';
import { CompanyEntity } from '@entities/company.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCompanyP13NInput } from '../dtos/inputs/create-company-p13n.input';
import { CreateCompanyInput } from '../dtos/inputs/create-company.input';
import { UpdateCompanyP13NInput } from '../dtos/inputs/update-company-p13n.input';
import { UpdateCompanyInput } from '../dtos/inputs/update-company.input';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CompanyPersonalizationEntity)
    private readonly companyP13nRepository: Repository<CompanyPersonalizationEntity>,
    private readonly dataSource: DataSource
  ) {}

  async getCompanies(paginationQuery: PaginationInput) {
    const { offset, limit } = paginationQuery;
    return this.companyRepository.find({
      skip: offset,
      take: limit,
      relations: { personalization: true },
    });
  }

  async getMyCompanies(userId: string) {
    return this.companyRepository.find({
      where: { businessCard: { user: { id: userId } } },
      relations: { personalization: true, businessCard: true },
    });
  }

  async getCompany(query: string, target: keyof CompanyEntity = 'id') {
    const company = await this.companyRepository.findOne({
      where: { [target]: query },
      relations: { personalization: true, businessCard: true },
    });
    if (!company)
      throw new NotFoundException(
        `Company with ${target} of ${query} not found`
      );
    return company;
  }

  async createCompany(createCompanyInput: CreateCompanyInput) {
    const { personalization, ...restCompanyInput } = createCompanyInput;

    let existingCompany: CompanyEntity;

    try {
      existingCompany = await this.getCompany(restCompanyInput.name, 'name');
    } catch (error) {
      if (error instanceof NotFoundException) {
        existingCompany = undefined;
      }
    }
    if (existingCompany) throw new ConflictException('Company already exist');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let company: CompanyEntity;
    let personalizationInstance: CompanyPersonalizationEntity;
    let isSuccess = false;

    try {
      company = this.companyRepository.create(restCompanyInput);

      if (personalization) {
        personalizationInstance = this.companyP13nRepository.create({
          company,
          ...personalization,
        });
      }
      if (personalizationInstance) {
        company.personalization = personalizationInstance;
      }

      await queryRunner.manager.save(company);
      await queryRunner.commitTransaction();
      isSuccess = true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (isSuccess) return company;
    throw new InternalServerErrorException('Failed to create company');
  }

  async updateCompany(
    companyId: string,
    updateCompanyInput: UpdateCompanyInput
  ) {
    const { personalization, ...restCompanyInput } = updateCompanyInput;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const company = await this.getCompany(companyId);
    let isSuccess = false;

    try {
      const personalizationInstance = await this.preloadPersonalization(
        companyId,
        { company, data: personalization }
      );

      Object.assign(company, {
        ...restCompanyInput,
        personalization: personalizationInstance,
      });

      if (personalizationInstance) {
        Object.assign(personalizationInstance, personalization);
        await queryRunner.manager.save(personalizationInstance);
      }

      await queryRunner.manager.save(company);
      await queryRunner.commitTransaction();
      isSuccess = true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (isSuccess) return company;
    throw new InternalServerErrorException('Failed to update company');
  }

  async updateCompanyP13n(
    companyId: string,
    updateCompanyP31NInput: UpdateCompanyP13NInput
  ) {
    const company = await this.getCompany(companyId);
    const personalizationInstance = await this.preloadPersonalization(
      companyId,
      { company, data: updateCompanyP31NInput }
    );

    Object.assign(personalizationInstance, updateCompanyP31NInput);
    return this.companyP13nRepository.save(personalizationInstance);
  }

  async deleteCompany(companyId: string) {
    const company = await this.getCompany(companyId);
    return this.companyRepository.remove(company);
  }

  async preloadPersonalization(
    companyId: string,
    personalization?: {
      company: CompanyEntity;
      data: CreateCompanyP13NInput;
    }
  ) {
    const personalizationInstance = await this.companyP13nRepository.findOne({
      where: { company: { id: companyId } },
    });

    if (personalizationInstance) return personalizationInstance;
    if (personalization)
      return this.companyP13nRepository.create({
        company: personalization.company,
        ...personalization.data,
      });
    return null;
  }
}
