import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessCardEntity } from './business-card.entity';
import { CompanyPersonalizationEntity } from './company-p13n.entity';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => BusinessCardEntity, (businessCard) => businessCard.company, {
    onDelete: 'SET NULL',
  })
  businessCard: BusinessCardEntity;

  @OneToOne(
    () => CompanyPersonalizationEntity,
    (personalization) => personalization.company,
    {
      cascade: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  personalization?: CompanyPersonalizationEntity;
}
