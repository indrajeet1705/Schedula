import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

export type ValidateGoogleDto = {
  email: string;
  name?: string;
  role: string;
  provider?: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(dto: ValidateGoogleDto) {
    const { email, name, role } = dto;
    if (!email) throw new BadRequestException('Google user email missing');
    if (!role || !['doctor', 'patient'].includes(role)) {
      throw new BadRequestException('Role must be doctor or patient');
    }
    let user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      user = this.userRepo.create({
        email,
        name: name || email,
        provider: 'google',
        role,
      });
      await this.userRepo.save(user);
    } 

    const payload = { sub: user.id, email: user.email, role: user.role };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return { user, token };
  }
}
