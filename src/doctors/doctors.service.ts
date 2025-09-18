import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { use } from 'passport';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private docRepo:Repository<Doctor>,
    private userService:UsersService
  ){}
 async create(createDoctorDto: CreateDoctorDto,userId:number) {
   if(!createDoctorDto){
    throw new BadRequestException('All fields are required!')
   }
   const user = await this.userService.findOne(userId);
   if (!user){
       throw new BadRequestException('provide userId')
   }
  
   const existingDoc= await this.findByEmail(user.email)
   if(existingDoc) throw new BadRequestException('Doctor with this email already exists')
   const newDoctor =  this.docRepo.create({
    ...createDoctorDto,
    user,
    name:user.name,
    email:user.email
   })
   
   return await this.docRepo.save(newDoctor)
  }

  async findAll() {
      return await this.docRepo.find()
  }

  findOne(id: number) {
    return this.docRepo.findOne({where:{id}})
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return await this.docRepo.update(id,updateDoctorDto)
  }

  remove(id: number) {
    return this.docRepo.delete(id)
  }
  async findByEmail(email:string){
    return await this.docRepo.findOne({where:{email}})
  }
  async updateProfileStatus ( docId : number , toUpdate:any){
    await this.docRepo.update(docId,{isProfileCompleted:toUpdate})
    const updatedDoc=await this.findOne(docId)
    if(updatedDoc)
    return updatedDoc
  }
  async findBySpeciality(speciality : string){
      return await this.docRepo.find({where:{speciality:speciality},relations:['availability','slots']})
  }
}
