import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserGoogleDto } from './dto/google.user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private otpService:OtpService
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      return {message:'User with this email already Exists ,Please try log in '};
    }
    const newUser = await this.userService.create(createUserDto);
    const otp= await this.otpService.create(newUser)  // <---
   
    const playload = { email: newUser.email, sub: newUser.id };
    const access_token = this.jwtService.sign(playload);
    return {
      message: 'signUp completed',
      user: newUser,
      access_token,
      otp
    };
  }

  async validateUser(email: string, password: string) {
    try {
      console.log(' in validate user');

      const user = await this.userService.findByEmail(email);
      console.log(user);
      if (!user) {
        throw new BadRequestException('user Not found! signup first');
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const playload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(playload);

        return { user, access_token };
      }

      return null;
    } catch (error) {
      console.log(error);
      throw new Error('Somethis went wrong!');
    }
  }
  async validateGoogleUser(userGoogleDto: UserGoogleDto) {
    const user = await this.userService.findByEmail(userGoogleDto.email)
    if( user){
      throw new BadRequestException('user with this email allready exists.Go to login ')
    }
    const data=JSON.parse(userGoogleDto.data)
    const userInfoToPass= {
      name:userGoogleDto.name,
      email:userGoogleDto.email,
      password:data.password,
      role:data.role,
      verificationMethod:userGoogleDto.verificationMethod,
      isVerified:userGoogleDto.isVerified

    }
    console.log(userGoogleDto)
    const newUser =await this.userService.create(userInfoToPass)

    const playload= { email:newUser.email,sub:newUser.id}
    const access_token= this.jwtService.sign(playload)
   
    return { newUser, access_token };
  }
  async verifyOtp(userId: number, token: string) {
    console.log(userId,token)
  const isValid = await this.otpService.validateOtp(userId, token);
  
  if (isValid) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.isVerified = true;
    await this.userRepo.save(user);

    return { message: 'User verified successfully', user };
  }
}
}
