import { Column, Entity, ManyToMany, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Patient{

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;
  @Column()
  age:number;
  @Column()
  gender:string;
  @Column()
  weight:number;
  @Column({unique:true})
  phoneNo:number
  @Column()
  complaint:string;
  @Column()
  isUser:boolean;
  @ManyToOne(()=>User,(user)=>user.patient)
  user:User[]
  
}