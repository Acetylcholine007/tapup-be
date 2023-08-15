import { PaginationInput } from '@common/dto/input/pagination.input';
import { BusinessCardPersonalizationEntity } from '@entities/business-card-p13n.entity';
import { BusinessCardEntity } from '@entities/business-card.entity';
import { CompanyEntity } from '@entities/company.entity';
import { UserEntity } from '@entities/user.entity';
import { CompanyService } from '@modules/company/services/company.service';
import { SocialMediaService } from '@modules/social-media/services/social-media.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBusinessCardP13NInput } from '../dtos/input/create-business-card-p13n.input';
import { CreateBusinessCardInput } from '../dtos/input/create-business-card.input';
import { UpdateBusinessCardP13NInput } from '../dtos/input/update-business-card-p13n.input';
import { UpdateBusinessCardInput } from '../dtos/input/update-business-card.input';

@Injectable()
export class BusinessCardService {
  constructor(
    @InjectRepository(BusinessCardEntity)
    private readonly businessCardRepository: Repository<BusinessCardEntity>,
    @InjectRepository(BusinessCardPersonalizationEntity)
    private readonly businessCardP13nRepository: Repository<BusinessCardPersonalizationEntity>,
    private readonly dataSource: DataSource,
    private readonly companyService: CompanyService,
    private readonly socialMediaService: SocialMediaService
  ) {}

  async getBusinessCards(paginationQuery: PaginationInput) {
    const { offset, limit } = paginationQuery;
    return this.businessCardRepository.find({
      skip: offset,
      take: limit,
      relations: {
        personalization: true,
        company: true,
        amenities: true,
        socialMediaLinks: { socialMedia: true },
        testimonials: { user: true },
      },
    });
  }

  async getMyBusinessCards(userId: string) {
    return this.businessCardRepository.find({
      where: { user: { id: userId } },
      relations: {
        personalization: true,
        company: true,
        amenities: true,
        socialMediaLinks: { socialMedia: true },
        testimonials: { user: true },
      },
    });
  }

  async getBusinessCard(
    query: string,
    target: keyof BusinessCardEntity = 'id'
  ) {
    const businessCard = await this.businessCardRepository.findOne({
      where: { [target]: query },
      relations: {
        personalization: true,
        company: true,
        amenities: true,
        socialMediaLinks: { socialMedia: true },
        testimonials: { user: true },
      },
    });
    if (!businessCard)
      throw new NotFoundException(
        `Business Card with ${target} of ${query} not found`
      );
    return businessCard;
  }

  async createBusinessCard(
    user: UserEntity,
    createBusinessCardInput: CreateBusinessCardInput
  ) {
    const {
      personalization,
      companyId,
      company,
      socialMedia,
      ...restBusinessCardInput
    } = createBusinessCardInput;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let businessCard: BusinessCardEntity;
    let cardCompany: CompanyEntity;
    let personalizationInstance: BusinessCardPersonalizationEntity;
    let isSuccess = false;

    try {
      businessCard = this.businessCardRepository.create(restBusinessCardInput);
      user.businessCards.push(businessCard);

      if (personalization) {
        personalizationInstance = this.businessCardP13nRepository.create({
          businessCard,
          ...personalization,
        });
      }
      if (personalizationInstance) {
        businessCard.personalization = personalizationInstance;
      }
      if (companyId) {
        cardCompany = await this.companyService.getCompany(companyId);
      } else if (company) {
        cardCompany = await this.companyService.createCompany(company);
      }
      if (cardCompany) {
        businessCard.company = cardCompany;
      }
      if (socialMedia) {
        businessCard.socialMediaLinks =
          await this.socialMediaService.setSocialMediaMapping(
            businessCard,
            socialMedia,
            true
          );
      }

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      isSuccess = true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (isSuccess) return businessCard;
    throw new InternalServerErrorException('Failed to create business card');
  }

  async updateBusinessCard(
    businessCardId: string,
    updateBusinessCardInput: UpdateBusinessCardInput
  ) {
    const {
      personalization,
      companyId,
      company,
      socialMedia,
      ...restBusinessCardInput
    } = updateBusinessCardInput;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const businessCard = await this.getBusinessCard(businessCardId);
    let cardCompany: CompanyEntity;
    let isSuccess = false;

    try {
      const personalizationInstance = await this.preloadPersonalization(
        businessCardId,
        { businessCard, data: personalization }
      );

      Object.assign(businessCard, {
        ...restBusinessCardInput,
        personalization: personalizationInstance,
      });

      if (personalizationInstance) {
        Object.assign(personalizationInstance, personalization);
        await queryRunner.manager.save(personalizationInstance);
      }
      if (companyId) {
        cardCompany = await this.companyService.getCompany(companyId);
      } else if (company) {
        cardCompany = await this.companyService.createCompany(company);
      }
      if (cardCompany) {
        businessCard.company = cardCompany;
      }
      if (socialMedia) {
        businessCard.socialMediaLinks =
          await this.socialMediaService.setSocialMediaMapping(
            businessCard,
            socialMedia,
            true
          );
      }

      await queryRunner.manager.save(businessCard);
      await queryRunner.commitTransaction();
      isSuccess = true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (isSuccess) return businessCard;
    throw new InternalServerErrorException('Failed to update business card');
  }

  async updateBusinessCardP13n(
    businessCardId: string,
    updateBusinessCardP31NInput: UpdateBusinessCardP13NInput
  ) {
    const businessCard = await this.getBusinessCard(businessCardId);
    const personalizationInstance = await this.preloadPersonalization(
      businessCardId,
      { businessCard, data: updateBusinessCardP31NInput }
    );

    Object.assign(personalizationInstance, updateBusinessCardP31NInput);
    return this.businessCardP13nRepository.save(personalizationInstance);
  }

  async deleteBusinessCard(businessCardId: string) {
    const businessCard = await this.getBusinessCard(businessCardId);
    return this.businessCardRepository.remove(businessCard);
  }

  async preloadPersonalization(
    businessId: string,
    personalization?: {
      businessCard: BusinessCardEntity;
      data: CreateBusinessCardP13NInput;
    }
  ) {
    const personalizationInstance =
      await this.businessCardP13nRepository.findOne({
        where: { businessCard: { id: businessId } },
      });

    if (personalizationInstance) return personalizationInstance;
    if (personalization)
      return this.businessCardP13nRepository.create({
        businessCard: personalization.businessCard,
        ...personalization.data,
      });
    return null;
  }
}
