import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Patient } from './patient.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column({ default: 'google' })
  provider: string;

  @Column({ type: 'enum', enum: ['doctor', 'patient'] })
  role: 'doctor' | 'patient';
}
