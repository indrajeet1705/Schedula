import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[TypeOrmModule.forFeature([Otp]),EmailModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports:[OtpService]
})
export class OtpModule {}
