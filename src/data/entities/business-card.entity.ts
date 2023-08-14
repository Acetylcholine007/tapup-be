import { BusinessHoursInput } from '@modules/business-card/dtos/input/business-hours.input';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AmenityEntity } from './amenity.entity';
import { BusinessCardPersonalizationEntity } from './business-card-p13n.entity';
import { CompanyEntity } from './company.entity';
import { SocialMediaMappingEntity } from './social-media-mapping.entity';
import { UserEntity } from './user.entity';

@Entity('business_card')
export class BusinessCardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  businessHours: BusinessHoursInput;

  @Column({ nullable: true })
  backgroundUrl?: string;

  @Column({ nullable: true })
  position?: string;

  @Column({ nullable: true })
  telNo?: string;

  @Column({ nullable: true })
  phoneNo?: string;

  @Column({ nullable: true })
  viber?: string;

  @Column({ nullable: true })
  whatsUp?: string;

  @Column({ nullable: true })
  skype?: string;

  @Column({ nullable: true })
  telegram?: string;

  @ManyToOne(() => UserEntity, (user) => user.businessCards, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.businessCard, {
    onDelete: 'SET NULL',
  })
  company: CompanyEntity;

  @OneToMany(() => AmenityEntity, (amenity) => amenity.businessCard, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  amenities: AmenityEntity[];

  @OneToMany(
    () => SocialMediaMappingEntity,
    (socialMediaMapping) => socialMediaMapping.businessCard,
    { cascade: true, onDelete: 'CASCADE' }
  )
  socialMediaLinks: SocialMediaMappingEntity[];

  @OneToOne(
    () => BusinessCardPersonalizationEntity,
    (personalization) => personalization.businessCard,
    {
      cascade: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  personalization?: BusinessCardPersonalizationEntity;
}
