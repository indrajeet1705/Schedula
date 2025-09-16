import { Type } from "class-transformer";
import {   Slot, Slots } from "../entities/slot.entity";
import { IsEmpty, IsNotEmpty, IsNumber, isNumber } from "class-validator";

export class CreateManualSlotDto {
  @IsNotEmpty()
   slots:Slots[]
   
}
export class CreateAutomaticSlotDto{
  @IsNotEmpty()
  @IsNumber()
  capacity:number
  @IsNotEmpty()
  startTime:string
  @IsNotEmpty()
  endTime:string
  @IsNotEmpty()
  @IsNumber()
  slotPeriod:number
}
