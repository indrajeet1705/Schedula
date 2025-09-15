import { Appointment } from "src/appointments/entities/appointment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum VerificationMethods{
  EMAIL="email",
  PHONE="phone",
  NONE="none"
}
@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  phone:string
  @Column({nullable:true})
  fullName:string
   @Column({nullable:true})
   email:string

  
  @Column({type:'date'})
  dob:Date

  @Column()
  gender:string
  
  @Column()
  age:string
  
  @Column({default:false})
  isProfileCompleted:boolean

  @Column({default:''})
  medicalHistory:string
  
  @OneToOne(()=>User,user=>user.patient,{onDelete:"CASCADE"})
  @JoinColumn({name:'uId'})
  user:User

  @OneToMany(()=>Appointment, appointment=>appointment.patient)
  appointments:Appointment[]

  

}
