import { Doctor } from "src/doctors/entities/doctor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export  enum SessionType{
  MORNING='Morning',
  AFTERNOON='Afternoon',
  EVENING ='Evening'

}
export enum ScheduleType{
    STREAM='Stream',
    WAVE="Wave"
}

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array',{default:[]})
  weekdays:string[]

  @Column("simple-array",{default:[]})
  sessions:SessionType[]

  @Column("simple-array") 
  slots: string[];

  @Column({type:'date',nullable:true})
  startTime:string

  @Column({type:'date',nullable:true})
  endTime:string

  @Column({default:1,type:'int'})
  capacity:number

  @Column({nullable:true})
  date:Date
  @Column({type:'enum',default:ScheduleType.STREAM,enum:ScheduleType})
  schedultType:ScheduleType

  @ManyToOne(() => Doctor, (doc) => doc.availability, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'docId' })
  doctor: Doctor;
}
