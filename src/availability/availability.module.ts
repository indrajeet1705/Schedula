import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports:[TypeOrmModule.forFeature([Availability]),DoctorsModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService,],
})
export class AvailabilityModule {}
