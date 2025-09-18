import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAutomaticSlotDto, CreateManualSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot, Slots } from './entities/slot.entity';
import { Repository } from 'typeorm';
import { AvailabilityService } from 'src/availability/availability.service';
import { Console } from 'console';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private slotRepo: Repository<Slot>,
    private availibalityService: AvailabilityService,
  
  ) {}
  async manualSlotcreation(createManualSlotDto: CreateManualSlotDto, avId: number) {
    const availability = await this.availibalityService.findOne(avId);
    

    if (!availability) {
      throw new Error(`Availability with id ${avId} not found`);
    }
    
      createManualSlotDto.slots=createManualSlotDto.slots.map(item=>({
       
        ...item,
        noOfBooked:0,
        booked:false
      
    }))
    
    const newCreatedSlots = this.slotRepo.create({
      ...createManualSlotDto,
      availability,
      doctor:availability.doctor
    });

    
    return await this.slotRepo.save(newCreatedSlots);
  }
  async automaticSlotCreation(createAutomaticSlotDto: CreateAutomaticSlotDto,avId:number) {
    let { startTime, endTime, capacity, slotPeriod } = createAutomaticSlotDto;
    const availability= await this.availibalityService.findOne(avId)
      

    if(!availability){ throw new BadRequestException('No Availability found for this slot')}

    // Convert HH.MM string into minutes
    const startMinutes = this.timeToMinutes(startTime);
    const endMinutes = this.timeToMinutes(endTime);

    const timeDifference = endMinutes - startMinutes;
    const noOfSlots = Math.floor(timeDifference / +slotPeriod);

    const slots: Slots[] = [];
    let current = startMinutes;
   console.log('in automatic slot creation')
    for (let i = 0; i < noOfSlots; i++) {
      const next = current + +slotPeriod;
      const slot: Slots = {
        timing: `${this.minutesToTime(current)}-${this.minutesToTime(next)}`,
        capacity: capacity,
        noOfBooked:0,
        booked : false
      };
      slots.push(slot);
      current = next;
    }
    console.log(slots)
    // Save into Slot entity
    const newSlot =  this.slotRepo.create({
      slots,
      availability,
      doctor:availability.doctor
      
    }, 
  )
    

    return await this.slotRepo.save(newSlot);
  }

  

  async findAll() {
    return this.slotRepo.find();
  }

  async findOne(id: number) {
   
    return  await this.slotRepo.findOne({where:{id}});
  }

  async   update(id: number, updateSlotDto: UpdateSlotDto) {
     return await this.slotRepo.update(id,updateSlotDto) ;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
  timeToMinutes(time: string): number {
    // Assuming input format "HH.MM" (e.g. "9.30")
    const [h, m] = time.split('.').map(Number);
    return h * 60 + (m || 0);
  }
  minutesToTime(totalMinutes: number): string {
    const h = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');
    const m = (totalMinutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
  convertTime(time: string) {
    let splitedTime: any = time.split('.');
    for (let i = 0; i < 2; i++) {
      splitedTime = parseInt(splitedTime[i]);
    }
    const newTime: any = new Date(
      0,
      0,
      0,
      splitedTime[0],
      splitedTime[1],
    ).toLocaleString('default', {
      timeStyle: 'short',
    });
    return { newTime, splitedTime };
  }

 
}
