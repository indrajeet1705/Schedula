import { Availability } from "src/availability/entities/availability.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export class Slots{
  timing:string
  capacity:number
  booked ?:boolean
  noOfBooked ?:number
} 
@Entity({name:'slots'})
export class Slot {
  @PrimaryGeneratedColumn()
  id:number

  @Column('json',{default:[]})
  slots:Slots[]
 

  @ManyToOne(()=>Availability , availability=> availability.slot)
  @JoinColumn({name:'aId'})
  availability:Availability

}
