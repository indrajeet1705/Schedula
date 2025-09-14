import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestOtpDto {
  @IsNotEmpty()
  @IsString()
  email:string

}

export class ValidateOtpDto{
  @IsNumber()
  userId:number
  @IsString()
  token:string
}
