import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Slot } from 'src/slots/entities/slot.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SessionType {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
}
export enum ScheduleType {
  STREAM = 'STREAM',
  WAVE = 'WAVE',
}

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { default: [] })
  weekdays: string[];

  @Column('simple-array', { default: [] })
  sessions: SessionType[];

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  @Column({ default: 1, type: 'int' })
  capacity: number;

  @Column({ type: 'enum', default: ScheduleType.STREAM, enum: ScheduleType })
  scheduleType: ScheduleType;

  @OneToMany(() => Slot, (slot) => slot.availability)
  slot: Slot;

  @ManyToOne(() => Doctor, (doc) => doc.availability, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'docId' })
  doctor: Doctor;
}
