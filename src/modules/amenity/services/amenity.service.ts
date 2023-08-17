import { PaginationInput } from '@common/dto/input/pagination.input';
import { AmenityPersonalizationEntity } from '@entities/amenity-p13n.entity';
import { AmenityEntity } from '@entities/amenity.entity';
import { BusinessCardEntity } from '@entities/business-card.entity';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateAmenityP13NInput } from '../dtos/input/create-amenity-p13n.input';
import { CreateAmenityInput } from '../dtos/input/create-amenity.input';
import { CreateDependentAmenityInput } from '../dtos/input/create-dependent-amenity.input';
import { UpdateAmenityP13NInput } from '../dtos/input/update-amenity-p13n.input';
import { UpdateAmenityInput } from '../dtos/input/update-amenity.input';

@Injectable()
export class AmenityService {
  constructor(
    @InjectRepository(AmenityEntity)
    private readonly amenityRepository: Repository<AmenityEntity>,
    @InjectRepository(AmenityPersonalizationEntity)
    private readonly amenityP13nRepository: Repository<AmenityPersonalizationEntity>,
    @InjectRepository(BusinessCardEntity)
    private readonly businessCardRepository: Repository<BusinessCardEntity>,
    private readonly dataSource: DataSource
  ) {}

  async getAmenities(paginationQuery: PaginationInput) {
    const { offset, limit } = paginationQuery;
    return this.amenityRepository.find({
      skip: offset,
      take: limit,
      relations: { personalization: true },
    });
  }

  async getMyAmenities(userId: string) {
    return this.amenityRepository.find({
      where: { businessCard: { user: { id: userId } } },
      relations: { personalization: true, businessCard: true },
    });
  }

  async getBusinessAmenities(businessId: string) {
    return this.amenityRepository.find({
      where: { businessCard: { id: businessId } },
      relations: { personalization: true, businessCard: true },
    });
  }

  async getAmenity(query: string, target: keyof AmenityEntity = 'id') {
    const amenity = await this.amenityRepository.findOne({
      where: { [target]: query },
      relations: { personalization: true, businessCard: true },
    });
    if (!amenity)
      throw new NotFoundException(
        `Amenity with ${target} of ${query} not found`
      );
    return amenity;
  }

  async createAmenity(
    createAmenityInput: CreateAmenityInput | CreateDependentAmenityInput,
    disableSave?: boolean
  ) {
    const { personalization, ...restAmenityInput } = createAmenityInput;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let businessCard: BusinessCardEntity;
    let amenity: AmenityEntity;
    let personalizationInstance: AmenityPersonalizationEntity;
    let caughtError: unknown;

    try {
      amenity = this.amenityRepository.create(restAmenityInput);

      if (personalization) {
        personalizationInstance = this.amenityP13nRepository.create({
          amenity,
          ...personalization,
        });
      }
      if (personalizationInstance) {
        amenity.personalization = personalizationInstance;
      }

      if (!disableSave) {
        if (!('businessCardId' in createAmenityInput))
          throw new InternalServerErrorException(
            'Business card ID is undefined'
          );
        businessCard = await this.businessCardRepository.findOne({
          where: { id: createAmenityInput.businessCardId },
        });
        businessCard.amenities.push(amenity);
        await queryRunner.manager.save(businessCard);
        await queryRunner.commitTransaction();
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      caughtError = error;
    } finally {
      await queryRunner.release();
    }

    if (!caughtError) return amenity;
    if (caughtError instanceof HttpException) throw caughtError;
    throw new InternalServerErrorException('Failed to create amenity');
  }

  async updateAmenity(
    amenityId: string,
    updateAmenityInput: UpdateAmenityInput
  ) {
    const { personalization, ...restAmenityInput } = updateAmenityInput;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const amenity = await this.getAmenity(amenityId);
    let caughtError: unknown;

    try {
      const personalizationInstance = await this.preloadPersonalization(
        amenityId,
        { amenity, data: personalization }
      );

      Object.assign(amenity, {
        ...restAmenityInput,
        personalization: personalizationInstance,
      });

      if (personalizationInstance) {
        Object.assign(personalizationInstance, personalization);
        await queryRunner.manager.save(personalizationInstance);
      }

      await queryRunner.manager.save(amenity);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      caughtError = error;
    } finally {
      await queryRunner.release();
    }

    if (!caughtError) return amenity;
    if (caughtError instanceof HttpException) throw caughtError;
    throw new InternalServerErrorException('Failed to update amenity');
  }

  async updateAmenityP13n(
    amenityId: string,
    updateAmenityP31NInput: UpdateAmenityP13NInput
  ) {
    const amenity = await this.getAmenity(amenityId);
    const personalizationInstance = await this.preloadPersonalization(
      amenityId,
      { amenity, data: updateAmenityP31NInput }
    );

    Object.assign(personalizationInstance, updateAmenityP31NInput);
    return this.amenityP13nRepository.save(personalizationInstance);
  }

  async deleteAmenity(amenityId: string) {
    const amenity = await this.getAmenity(amenityId);
    return this.amenityRepository.remove(amenity);
  }

  async preloadPersonalization(
    amenityId: string,
    personalization?: {
      amenity: AmenityEntity;
      data: CreateAmenityP13NInput;
    }
  ) {
    const personalizationInstance = await this.amenityP13nRepository.findOne({
      where: { amenity: { id: amenityId } },
    });

    if (personalizationInstance) return personalizationInstance;
    if (personalization)
      return this.amenityP13nRepository.create({
        amenity: personalization.amenity,
        ...personalization.data,
      });
    return null;
  }
}
