import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { SlotsModule } from 'src/slots/slots.module';
import { Availability } from 'src/availability/entities/availability.entity';
import { AvailabilityModule } from 'src/availability/availability.module';

@Module({
  imports:[TypeOrmModule.forFeature([Appointment]),DoctorsModule,PatientsModule,SlotsModule,AppointmentsModule,AvailabilityModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
