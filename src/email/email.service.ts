import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/create-email.dto';
@Injectable()
export class EmailService {
  constructor(
    private configService:ConfigService
  ){}
  emailTransport(){
    const transport = nodemailer.createTransport({
      // host:this.configService.get('HOST_NAME'),
      // port:this.configService.get('PORT'),
      service:'gmail',
      secure:false,
      auth:{
        user:this.configService.get('EMAIL_USER'),
        pass:this.configService.get('EMAIL_PASSWORD')
      }
    })
    
    return transport
  }
  async sendEmail(dto:SendEmailDto){
    const {recipients,html,subject}=dto
    const transport= this.emailTransport()
    const options: nodemailer.SendMailOptions={
      from : this.configService.get('EMAIL_USER'),
      to:recipients,
      subject:subject, 
      html:html
    }
    try {
      return await transport.sendMail(options)
      console.log('email sent successfully ')
    } catch (error) {
      console.log(error)
    }
  }
}
