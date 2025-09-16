import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ScheduleType, SessionType } from '../entities/availability.entity';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  weekdays: string[];
  @IsNotEmpty()
  sessions: SessionType[];
  @IsNotEmpty()
  startTime: string;
  @IsNotEmpty()
  endTime: string;
  @IsOptional()  
  capacity: number;
  @IsNotEmpty()
  scheduleType: ScheduleType;
  @IsNotEmpty()
  slotCreation:'manual'| 'automatic'
  @IsOptional()
  @IsString()
  slotPeriod:string
  
}
