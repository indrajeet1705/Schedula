import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {

  fullName?: string;

 
  email?: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  age: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsString()
  @IsOptional()
  medicalHistory?:string

  isProfileCompleted?:boolean
}

export class VerificationDto {
  verificationMethod: string;
  otp: string;
}
