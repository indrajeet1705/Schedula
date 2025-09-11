import { Doctor } from "src/doctors/entities/doctor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day:Date
  
  @Column("simple-array") 
  slots: string[]; 


  @ManyToOne(() => Doctor, (doc) => doc.availability, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'docId' })
  doctor: Doctor;
}
