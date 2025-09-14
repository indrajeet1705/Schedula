import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports:[
       ConfigModule,
       PassportModule.register({session:false}),
       TypeOrmModule.forFeature([User]),
       JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:(config:ConfigService)=>({
          secret:config.get('JWT_SECRET'),
          signOptions:{expiresIn:'1d'}
        })
       }),
      UsersModule,OtpModule

  ],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {
  
}
