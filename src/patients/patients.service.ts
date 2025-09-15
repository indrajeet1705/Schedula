import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo:Repository<Patient>,
    private userService:UsersService
  ){}
  async create(createPatientDto: CreatePatientDto,userId:number):Promise<Patient | null> {
    if(!createPatientDto){ throw new BadRequestException('provide all info')}

    const user = await this.userService.findOne(userId)
    if(!user){
      throw new NotFoundException('Server error,try again later')
    }
    const existingPatient= await this.findByEmail(user.email)
    if(existingPatient) {
    throw new BadRequestException('Patient with this email already exists ')  
    }

    let newPatient =  this.patientRepo.create({
      ...createPatientDto,
      user,
      fullName:user.name,
      email:user.email
      
    })
    newPatient=await this.patientRepo.save(newPatient)
    await this.updateProfilCompleted(newPatient.id,true)
    return await this.patientRepo.findOne({where:{id:newPatient.id},relations:['user']})  ;
  }

  async findAll() {
    return await this.patientRepo.find();
  }

  async findOne(id: number) {
    return await this.patientRepo.findOne({where:{id}});
  }

async update(id: number, updatePatientDto: UpdatePatientDto) {
    return await this.patientRepo.update(id,updatePatientDto);
  }

  async remove(id: number) {
    return await this.patientRepo.delete(id)
  }
  async findByEmail(email:string){
    return await this.patientRepo.findOne({where:{email}})
  }
  async updateProfilCompleted(id:number,toUpdate:boolean){
    return this.patientRepo.update(id,{isProfileCompleted:toUpdate})
  }
}
