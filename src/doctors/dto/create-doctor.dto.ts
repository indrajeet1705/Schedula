import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  mobileNo: string;
  @IsNotEmpty()
  @IsString()
  fees: string;
  @IsNotEmpty()
  @IsString()
  speciality: string;
  @IsNotEmpty()
  @IsString()
  location: string;
  @IsNotEmpty()
  @IsString()
  experience: string;
  @IsNotEmpty()
  @IsString()
  degree: string;
  @IsNotEmpty()
  @IsString()
  gender: string;
  @IsNotEmpty()
  available: boolean;

  isProfileCompleted?:boolean
  
  
}


