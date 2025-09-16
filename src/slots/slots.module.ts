import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { AvailabilityModule } from 'src/availability/availability.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';

@Module({
  imports:[AvailabilityModule,TypeOrmModule.forFeature([Slot])],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}
