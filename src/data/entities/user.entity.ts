import { Role } from '@enums/user.enum';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

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
}
