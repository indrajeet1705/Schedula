import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dob: Date;
  @IsNumber()
  @IsNotEmpty()
  weight: number;
  @IsNumber()
  @IsNotEmpty()
  age: number;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class VerificationDto {
  verificationMethod: string;
  otp: string;
}
