import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;
  @Column()
  specialization:string;
  @Column()
  experience:number;
  @Column({unique:true})
  phoneNo:number
  @Column()
  degree:string;
  @Column()
  fees:number;
  @Column({unique:true})
  email:string;
  @Column()
  password:string;
  @Column()
  image:string;


}