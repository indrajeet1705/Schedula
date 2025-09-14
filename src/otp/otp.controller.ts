import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { OtpService } from './otp.service';
import {  RequestOtpDto, ValidateOtpDto } from './dto/create-otp.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Controller('otp')
export class OtpController {
  constructor(
    
  ) {}




}
