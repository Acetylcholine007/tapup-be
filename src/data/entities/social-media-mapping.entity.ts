import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessCardEntity } from './business-card.entity';
import { SocialMediaEntity } from './social-media.entity';

@Entity('social-media-mapping')
export class SocialMediaMappingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  link: string;

  @ManyToOne(
    () => SocialMediaEntity,
    (socialMedia) => socialMedia.socialMediaMappings,
    {
      onDelete: 'CASCADE',
    }
  )
  socialMedia: SocialMediaEntity;

  @ManyToOne(
    () => BusinessCardEntity,
    (businessCard) => businessCard.socialMediaLinks,
    {
      onDelete: 'CASCADE',
    }
  )
  businessCard: BusinessCardEntity;
}
