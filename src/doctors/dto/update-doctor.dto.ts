import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  email?:string
  name?:string
  gender?: string | undefined;
  fees?: string | undefined;
  mobileNo?: string | undefined;
  location?: string | undefined;
  experience?: string | undefined;
  degree?: string | undefined;
  isProfileCompleted?: boolean | undefined;
  available?: boolean | undefined;
  speciality?: string | undefined;

  
}
