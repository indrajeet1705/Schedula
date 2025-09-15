import { Availability } from "src/availability/entities/availability.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'slots'})
export class Slot {
  @PrimaryGeneratedColumn()
  id:number

  @ManyToOne(()=>Availability , availability=> availability.slot)
  @JoinColumn({name:'aId'})
  availability:Availability

}
