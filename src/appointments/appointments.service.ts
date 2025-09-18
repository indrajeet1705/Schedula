import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { AvailabilityService } from 'src/availability/availability.service';
import { SlotsService } from 'src/slots/slots.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    private docService: DoctorsService,
    private patientService: PatientsService,
    private availabilityService: AvailabilityService,
    private slotService: SlotsService,
  ) {}
  async create(
    createAppointmentDto: CreateAppointmentDto,
    pId: number,
    docId: number,
    sId: number,
  ) {
    const doctor = await this.docService.findOne(docId);
    const patient = await this.patientService.findOne(pId);
    const slot = await this.slotService.findOne(sId);
    if (!doctor || !patient || !slot) {
      throw new BadRequestException(
        'No doctor and patient for this appointment',
      );
    }

    const perticularSlotId = slot?.slots.find(
      (item) => item.timing === createAppointmentDto.slot,
    );

    if (!perticularSlotId) {
      throw new BadRequestException('slot not found');
    }
    if( (perticularSlotId?.noOfBooked || 0 ) < perticularSlotId.capacity){
      perticularSlotId.noOfBooked= (perticularSlotId.noOfBooked||0)+1
      if(perticularSlotId.patientEmail?.includes(patient.email)){
        throw new BadRequestException("one Patien can't book more than one seats in same slot")
      }
      perticularSlotId.patientEmail?.push(patient.email)
      if( perticularSlotId.noOfBooked === perticularSlotId.capacity){
        perticularSlotId.booked=true
      }
      await this.slotService.update(slot?.id, { slots: slot?.slots });
    }
    else{
      throw new BadRequestException('slot is full')
    }
    
    const timeArr= perticularSlotId.timing.split("-")
    const [stHour,stMin]= timeArr[0].split(":").map(Number)
    const [endHour,endMin] =timeArr[1].split(":").map(Number)
    
    const stTime = new Date(0,0,0,stHour,stMin)
    const endTime = new Date (0,0,0,endHour,endMin)
    const totalTime = (endTime.getTime() - stTime.getTime()) / (1000 * 60);
    const interval = totalTime/perticularSlotId.capacity

    const patientIndex = perticularSlotId.noOfBooked -1
    const reportingTime = new Date ( stTime.getTime()+(patientIndex * interval * 60000))
    const reportingTimeString= `${reportingTime.getHours()}:${reportingTime.getMinutes().toString().padStart(2,'0')}`
    console.log(stTime)

    
    const newAppointment = this.appointmentRepo.create({
      ...createAppointmentDto,
      fee: doctor?.fees,
      doctor,
      patient,
      reportingTime:reportingTimeString ,
      slotTime:slot
    });
    
    return await this.appointmentRepo.save(newAppointment);
  }

  async findAll() {
    return await this.appointmentRepo.find();
  }

  async findOne(id: number) {
    return await this.appointmentRepo.find({
      where: { id },
      relations: ['doctor', 'patient'],
    });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return ;
  }

 async remove(id: number) {
    return await this.appointmentRepo.delete(id) ;
  }
}
