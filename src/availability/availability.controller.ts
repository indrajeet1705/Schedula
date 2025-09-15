import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post('/:id')
  async create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
    @Param('id') id: number,
  ) {
    console.log(createAvailabilityDto,id)
    return await this.availabilityService.create(createAvailabilityDto, id);
  }

  @Get()
  findAll() {
    return this.availabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availabilityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ) {
    return this.availabilityService.update(+id, updateAvailabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilityService.remove(+id);
  }
}
