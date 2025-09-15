import { Appointment } from "src/appointments/entities/appointment.entity";
import { Availability } from "src/availability/entities/availability.entity";
import { User } from "src/users/entities/user.entity";

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

const enum ConsultingType{
  WAVE='wave',
  STREAM='stream'
}

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  name:string

  @Column({unique:true,nullable:true})
  email:string

  @Column()
  location: string;
 


  @Column()
  mobileNo: string;

  @Column()
  fees: string;

  @Column()
  speciality: string;

  @Column()
  experience: string;

  @Column()
  degree: string;

  @Column()
  gender: string;

  @Column({ default: true })
  available: boolean;

  @OneToOne(() => User,user=>user.doctor,{onDelete:'CASCADE'})
  @JoinColumn()
  user: User;

  @Column({default:false})
  isProfileCompleted:boolean

 
  @OneToMany(() => Availability, (av) => av.doctor)
  availability: Availability[];

  @OneToMany(() => Appointment, (appt) => appt.doctor)
  appointments: Appointment[];
}
