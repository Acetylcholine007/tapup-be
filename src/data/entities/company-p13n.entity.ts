import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('company_p13n')
export class CompanyPersonalizationEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  companyTextColor?: string;

  @OneToOne(() => CompanyEntity, (company) => company.personalization)
  company: CompanyEntity;
}
