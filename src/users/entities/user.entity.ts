import { Appointment } from "src/appointments/entities/appointment.entity";
import { Doctor } from "src/doctors/entities/doctor.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  
  @Column()
  password:string

  @Column({default:'google'})
  provider: string; 

  @Column({default:false,nullable:false})
  isVerified:boolean

  @Column({ type: 'enum', enum: ['doctor', 'patient'] })
  role: string;

  @Column({default:'email'})
  verificationMethod:'google' | 'email' 

  @OneToOne(()=>Doctor)
  doctor:Doctor

  @OneToMany(()=>Patient,(patient)=>patient.user)
  patient:Patient

  @OneToMany(()=>Appointment,appt=>appt.user)
  appointments:Appointment[]
}
