import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessCardEntity } from './business-card.entity';
import { UserEntity } from './user.entity';

@Entity('testimonial')
export class TestimonialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.testimonials, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(
    () => BusinessCardEntity,
    (businessCard) => businessCard.testimonials,
    {
      onDelete: 'CASCADE',
    }
  )
  businessCard: BusinessCardEntity;
}
