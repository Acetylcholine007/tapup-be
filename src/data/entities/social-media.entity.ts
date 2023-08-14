import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocialMediaMappingEntity } from './social-media-mapping.entity';

@Entity('social-media')
export class SocialMediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => SocialMediaMappingEntity,
    (socialMediaMapping) => socialMediaMapping.socialMedia,
    {
      cascade: true,
      onDelete: 'CASCADE',
    }
  )
  socialMediaMappings: SocialMediaMappingEntity[];
}
