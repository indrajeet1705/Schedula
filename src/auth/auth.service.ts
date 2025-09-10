import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

export type ValidateGoogleDto = {
  email: string;
  name?: string; // use full name instead of firstName + lastName
  picture?: string;
  googleId?: string;
  role: 'doctor' | 'patient';
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(dto:ValidateGoogleDto) {
   const {email,googleId,picture,name,role}= dto;
    if (!email) throw new BadRequestException('Google user email missing');
    if (!role || !['doctor', 'patient'].includes(role)){
      throw new BadRequestException('Role must be doctor or patient');
    }
     let user = await this.userRepo.findOne({ where: { email } });

  if (!user) {
      user = this.userRepo.create({
    email,
    name: name || email, // fallback
    picture,
    provider: 'google',
    googleId,
    role,
    
  });
    await this.userRepo.save(user);
  }
  // else {
  //     // optional: update provider/role/picture if changed
  //     let changed = false;
  //     if (user.provider !== 'google') { user.provider = 'google'; changed = true; }
  //     if (user.role !== role) { user.role = role; changed = true; }
  //     // if (user.picture !== picture) { user.picture = picture; changed = true; }
  //     if (changed) await this.userRepo.save(user);
  //   }

  const payload = { sub: user.id, email: user.email, role: user.role };

  const token = this.jwtService.sign(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h',
  });

  return { user, token };
}
}
