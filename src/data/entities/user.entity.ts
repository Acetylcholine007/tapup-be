import { Role } from '@enums/user.enum';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessCardEntity } from './business-card.entity';
import { TestimonialEntity } from './testimonial.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Index()
  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  profileUrl?: string;

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

  @Column({ enum: Role, default: Role.REGULAR })
  role: Role;

  @OneToMany(() => BusinessCardEntity, (businessCards) => businessCards.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  businessCards: BusinessCardEntity[];

  @OneToMany(() => TestimonialEntity, (testimonial) => testimonial.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  testimonials: TestimonialEntity[];
}
