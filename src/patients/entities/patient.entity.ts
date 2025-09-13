import { Appointment } from "src/appointments/entities/appointment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum VerificationMethods{
  EMAIL="email",
  PHONE="phone",
  NONE="none"
}
@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({unique:true})
  phone:string

  @Column({unique:true})
  email:string
  
  @Column({type:'date'})
  dob:Date
  
  @Column()
  password:string

  @Column()
  weight: number;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({nullable:true,default:''})
  complaints: string;
  
  @Column({default:false})
  isVerified:boolean
  
  @Column({nullable:true})
  otpCode:string

  @Column({nullable:true})
  otpExpiry:Date

  @Column({default:VerificationMethods.NONE,nullable:true})
  verificationMethod:VerificationMethods
  
  @Column({nullable:true})
  emailVerifiedAt:Date

  @Column({nullable:true})
  phoneVerifiedAt:Date

  @Column({default:1})
  onboardingSteps:number

  @Column({default:false})
  isOnboardingCompleted:boolean




  @ManyToOne(() => User,(user)=>user.patient)
  @JoinColumn({ name: 'uId' })
  user: User;


  @OneToMany(() => Appointment, (appt) => appt.patient)
  appointments: Appointment[];
}
