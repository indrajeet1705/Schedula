import { Appointment } from "src/appointments/entities/appointment.entity";
import { Availability } from "src/availability/entities/availability.entity";
import { User } from "src/users/entities/user.entity";

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  mobileNo: string;

  @Column()
  fees: number;

  @Column()
  speciality: string;

  @Column()
  experience: number;

  @Column()
  degree: string;

  @Column()
  gender: string;

  @Column({ default: true })
  available: boolean;

  @Column()
  slotPeriod: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'uId' })
  user: User;

 
  @OneToMany(() => Availability, (av) => av.doctor)
  availability: Availability[];

  @OneToMany(() => Appointment, (appt) => appt.doctor)
  appointments: Appointment[];
}
