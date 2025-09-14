import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class SendEmailDto {
  @IsEmail({},{each:true})
  recipients: string[];

  @IsString()
  subject: string;
  @IsString()
  html: string;

  @IsOptional()
  @IsString()
  text?: string;
}
export class VerifyotpDto{
userId:number
  token:string
}
