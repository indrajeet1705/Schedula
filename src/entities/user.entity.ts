import { Column, Entity, ForeignKey, OneToMany,PrimaryGeneratedColumn } from "typeorm";

import { Patient } from "./patient.entity";


@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  name:string;
  @Column({unique:true})
  email:string;
  @Column()
  password:string;
  @Column()
  age:number;
  @Column({unique:true})
  phoneNo:number;
  @Column()
  gender:string;
  @Column()
  weight:number;
  @Column()
  image:string;
  @OneToMany(() => Patient, (patient) => patient.user)
  patient:Patient[];
}