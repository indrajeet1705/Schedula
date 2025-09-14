import { Injectable } from '@nestjs/common';
// import { CreateOtpDto } from './dto/create-otp.dto';
// import { UpdateOtpDto } from './dto/update-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { MoreThan, Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
    private emailService: EmailService,
  ) {}
  async create(user: User) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
    const otpEntity = this.otpRepo.create({
      user,
      otpToken: hashedOtp,
      expiresAt,
    });
    await this.otpRepo.save(otpEntity);

    const emailDto = {
      recipients: [user.email],
      subject: 'OTP for verification',
      html: `Your OTP Code is <Strong>${otp}</Strong> </br> Provide this OTP to verify you account`,
    };
    await this.emailService.sendEmail(emailDto);
    return otp; //<---2
  }

  async validateOtp(userId: number, token: string): Promise<boolean> {
    const validToken = await this.otpRepo.findOne({
      where: { user: { id: userId }, expiresAt: MoreThan(new Date()), },relations:['user'],
    });

    if (!validToken) {
      throw new Error('OTP has expired or does not exist, request a new one');
    }
   console.log(validToken)
   console.log(token)
    const isMatch = await bcrypt.compare(token, validToken.otpToken);
    if (!isMatch) {
      throw new Error('Invalid OTP provided');
    }

    return true;
  }
}
