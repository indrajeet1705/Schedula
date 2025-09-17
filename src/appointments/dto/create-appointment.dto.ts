import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
@IsString()
  scheduledOn: string;
  
  @IsNotEmpty()
  @IsString()
  slot: string
   @IsString()
  message: string
  @IsOptional()
  fee?:string
  
}
