import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  fullName?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  dob?: Date | undefined;
  age?: string | undefined;
  gender?: string | undefined;
  medicalHistory?: string | undefined;
  isProfileCompleted?: boolean | undefined;
}
