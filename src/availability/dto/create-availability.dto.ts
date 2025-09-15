import { IsNotEmpty } from 'class-validator';
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
  @IsNotEmpty()
  capacity: number;
  @IsNotEmpty()
  scheduleType: ScheduleType;
}
