import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo:Repository<Patient>
  ){}
  async create(createPatientDto: CreatePatientDto):Promise<Patient> {
    if(!createPatientDto) throw new Error('provide all info')
    let newPatient =  this.patientRepo.create(createPatientDto)
    newPatient={...newPatient,onboardingSteps:2}
   
    await this.patientRepo.save(newPatient)
    

    return newPatient;
  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
