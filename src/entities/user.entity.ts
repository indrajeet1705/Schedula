import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;   // ✅ full name from Google

  @Column({ nullable: true })
  picture: string;

  @Column({ unique: true, nullable: true })
  googleId: string;   // ✅ string, not Object

  @Column({ type: 'enum', enum: ['doctor', 'patient'] })
  role: 'doctor' | 'patient';
  @Column({default:'google'})
  provider:string
   @Column({default:''})
  password:string 

}
