import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/create-email.dto';


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
   @Post('send')
   async sendEmail(@Body() dto:SendEmailDto){
   const ans= await this.emailService.sendEmail(dto)
    return {message:"Email sent successfully"}

   }


}
