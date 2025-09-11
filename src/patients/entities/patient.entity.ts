import { Appointment } from "src/appointments/entities/appointment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  complaints: string;


  @ManyToOne(() => User,(user)=>user.patient)
  @JoinColumn({ name: 'uId' })
  user: User;


  @OneToMany(() => Appointment, (appt) => appt.patient)
  appointments: Appointment[];
}
