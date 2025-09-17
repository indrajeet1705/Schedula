import { time } from 'console';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Slot } from 'src/slots/entities/slot.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'date'})
  scheduledOn: string;



  @Column()
  fee: string;
  @Column()
  message:string

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pid' })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'docId' })
  doctor: Doctor;
  @ManyToOne(()=>Slot,slot=>slot.appointments)
  slotTime:Slot
}
