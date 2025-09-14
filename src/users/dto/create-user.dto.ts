import { IsEmpty, IsNotEmpty } from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: string;
  isVerified?:boolean
  verificationMethod?:'email'| 'google'
}
export class LoginDto{
  @IsEmpty()
  email:string
  @IsEmpty()
  password:string
}
