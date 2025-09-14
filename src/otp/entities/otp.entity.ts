import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Otp {
@PrimaryGeneratedColumn()
id:number

@ManyToOne(()=>User,{nullable:false})
@JoinColumn()
user:User

@Column()
otpToken:string

@Column()
expiresAt:Date
@CreateDateColumn()
createdAt:Date
}
