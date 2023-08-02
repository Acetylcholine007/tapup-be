import { BusinessHoursInput } from '@modules/business-card/dtos/input/business-hours.input';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessCardPersonalizationEntity } from './business-card-p13n.entity';
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

  @OneToOne(
    () => BusinessCardPersonalizationEntity,
    (personalization) => personalization.businessCard
  )
  @JoinColumn()
  personalization: BusinessCardPersonalizationEntity;
}