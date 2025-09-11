import { Doctor } from "src/doctors/entities/doctor.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  fees: number;



  @ManyToOne(() => Patient, (patient) => patient.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pid' })
  patient: Patient;


  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'docId' })
  doctor: Doctor;

 
 @ManyToOne(()=>User, user=>user.appointments)
 @JoinColumn({name:'Uid'})
 user:User
}
