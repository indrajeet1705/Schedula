import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';


@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availableRepo:Repository<Availability>,
    private docService:DoctorsService,
   
  ){}
  async create(createAvailabilityDto: CreateAvailabilityDto,docId:number) {
   
   const doc = await this.docService.findOne(docId)
   if(!doc){
    throw new BadRequestException('Try again later!')
   }
   const updatedDoc=await this.docService.updateProfileStatus(docId,true)
   
   const newAvailability=  this.availableRepo.create({
    ...createAvailabilityDto,
    doctor:updatedDoc
   })

   const createdAvailability=await this.availableRepo.save(newAvailability)
   return {
    message:"Doctor Profile is Complete ",
    available:createdAvailability
   }
   
  }

  findAll() {
    return `This action returns all availability`;
  }

  async findOne(id: number) {
    return await this.availableRepo.findOne({where:{id}});
  }

  update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
    return `This action updates a #${id} availability`;
  }

  remove(id: number) {
    return `This action removes a #${id} availability`;
  }
}
