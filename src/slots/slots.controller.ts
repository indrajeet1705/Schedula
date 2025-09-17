import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateAutomaticSlotDto, CreateManualSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Post('/manual/:id')
  create(@Body() createSlotDto: CreateManualSlotDto,@Param('id') id:number) {
   

      return this.slotsService.manualSlotcreation(createSlotDto,id);
    
    
  }
  @Post('/automatic/:id')
  createAutomatic(
    @Body() createAutomaticSlotDto:CreateAutomaticSlotDto,@Param('id') id:number
  ){
    return this.slotsService.automaticSlotCreation(createAutomaticSlotDto,id)
  }


  @Get()
  findAll() {
    return this.slotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotsService.update(+id, updateSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slotsService.remove(+id);
  }
}
