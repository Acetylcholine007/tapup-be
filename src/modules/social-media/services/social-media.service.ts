import { PaginationInput } from '@common/dto/input/pagination.input';
import { BusinessCardEntity } from '@entities/business-card.entity';
import { SocialMediaMappingEntity } from '@entities/social-media-mapping.entity';
import { SocialMediaEntity } from '@entities/social-media.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSocialMediaInput } from '../dtos/input/create-social-media.input';
import { SocialMediaLinkInput } from '../dtos/input/social-media-link.input';
import { UpdateSocialMediaInput } from '../dtos/input/update-social-media.input';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectRepository(SocialMediaEntity)
    private readonly socialMediaRepository: Repository<SocialMediaEntity>,
    @InjectRepository(SocialMediaMappingEntity)
    private readonly socialMediaMappingRepository: Repository<SocialMediaMappingEntity>,
    @InjectRepository(BusinessCardEntity)
    private readonly businessCardRepository: Repository<BusinessCardEntity>
  ) {}

  async getAllSocialMedia(paginationQuery: PaginationInput) {
    const { offset, limit } = paginationQuery;
    return this.socialMediaRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async getSocialMedia(query: string, target: keyof SocialMediaEntity = 'id') {
    const amenity = await this.socialMediaRepository.findOne({
      where: { [target]: query },
    });
    if (!amenity)
      throw new NotFoundException(
        `Social media with ${target} of ${query} not found`
      );
    return amenity;
  }

  async createSocialMedia(createSocialMediaInput: CreateSocialMediaInput) {
    let existingSocialMedia: SocialMediaEntity;
    try {
      existingSocialMedia = await this.getSocialMedia(
        createSocialMediaInput.name,
        'name'
      );
    } catch (error) {
      if (error instanceof NotFoundException) existingSocialMedia = undefined;
    }

    if (existingSocialMedia)
      throw new ConflictException('Social media already exists');

    const socialMedia = this.socialMediaRepository.create(
      createSocialMediaInput
    );
    return this.socialMediaRepository.save(socialMedia);
  }

  async updateSocialMedia(
    socialMediaId: string,
    updateSocialMediaInput: UpdateSocialMediaInput
  ) {
    const socialMedia = await this.getSocialMedia(socialMediaId);

    Object.assign(socialMedia, updateSocialMediaInput);
    return this.socialMediaRepository.save(socialMedia);
  }

  async deleteSocialMedia(socialMediaId: string) {
    const socialMedia = await this.getSocialMedia(socialMediaId);
    return this.socialMediaRepository.remove(socialMedia);
  }

  async getSocialMediaMappings(
    businessCardId: string,
    socialMediaIds?: string[]
  ) {
    const existingSocialMediaQuery = this.socialMediaMappingRepository
      .createQueryBuilder('smm')
      .leftJoinAndSelect('smm.businessCard', 'businessCard')
      .leftJoinAndSelect('smm.socialMedia', 'socialMedia')
      .where('businessCard.id = :businessCardId', {
        businessCardId,
      });
    if (socialMediaIds)
      existingSocialMediaQuery.andWhere('socialMedia.id IN (:socialMediaIds)', {
        socialMediaIds,
      });

    return socialMediaIds
      ? existingSocialMediaQuery.getMany()
      : this.socialMediaMappingRepository.find({
          where: { businessCard: { id: businessCardId } },
          relations: { socialMedia: true },
        });
  }

  async getSocialMediaMapping(businessCardId: string, socialMediaId: string) {
    return this.socialMediaMappingRepository.findOne({
      where: {
        businessCard: { id: businessCardId },
        socialMedia: { id: socialMediaId },
      },
      relations: { socialMedia: true },
    });
  }

  async setSocialMediaMapping(
    inputBusinessCard: string | BusinessCardEntity,
    links: SocialMediaLinkInput[],
    disableSave?: boolean
  ) {
    const businessCard =
      typeof inputBusinessCard === 'string'
        ? await this.businessCardRepository.findOne({
            where: { id: inputBusinessCard },
          })
        : inputBusinessCard;

    const existingMappings: SocialMediaMappingEntity[] = businessCard.id
      ? await this.getSocialMediaMappings(businessCard.id)
      : [];

    const prunedMappings = (
      await Promise.all(
        existingMappings.map(async (mapping) => {
          const linkItem = links.find(
            (link) => link.socialMediaId === mapping.socialMedia.id
          );
          if (linkItem) {
            const socialMedia = await this.getSocialMedia(
              linkItem.socialMediaId
            );
            mapping.socialMedia = socialMedia;
            mapping.link = linkItem.link;
            return mapping;
          } else {
            await this.socialMediaMappingRepository.remove(mapping);
            return null;
          }
        })
      )
    ).filter((mapping) => mapping != null);

    const newMappings = (
      await Promise.all(
        links.map(async (link) => {
          if (
            !prunedMappings.some(
              (item) => item.socialMedia.id === link.socialMediaId
            )
          ) {
            const socialMedia = await this.getSocialMedia(link.socialMediaId);
            return this.socialMediaMappingRepository.create({
              socialMedia,
              link: link.link,
            });
          } else return null;
        })
      )
    ).filter((mapping) => mapping != null);

    const combinedMappings = prunedMappings.concat(newMappings);

    return disableSave
      ? combinedMappings
      : Promise.all(
          combinedMappings.map(async (mapping) =>
            this.socialMediaMappingRepository.save(mapping)
          )
        );
  }
}
