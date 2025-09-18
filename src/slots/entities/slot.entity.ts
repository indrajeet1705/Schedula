import { Appointment } from "src/appointments/entities/appointment.entity";
import { Availability } from "src/availability/entities/availability.entity";
import { Doctor } from "src/doctors/entities/doctor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


export class Slots{
  timing:string
  capacity:number
  booked ?:boolean
  noOfBooked ?:number
  patientEmail:string[]
} 
@Entity({name:'slots'})
export class Slot {
  @PrimaryGeneratedColumn()
  id:number

  @Column('json',{default:[]})
  slots:Slots[]
 

  @OneToOne(()=>Availability , availability=> availability.slot)
  @JoinColumn({name:'aId'})
  availability:Availability

  @ManyToOne(()=>Doctor,doctor=>doctor.slots,{eager:true})
  @JoinColumn({name:'docId'},)
  doctor:Doctor
  @OneToMany(()=>Appointment,appointment=>appointment.slotTime)
  appointments:Appointment[]
}
