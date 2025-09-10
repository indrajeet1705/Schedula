import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[
       ConfigModule,
       PassportModule,
       TypeOrmModule.forFeature([User]),
       JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:(config:ConfigService)=>({
          secret:config.get('JWT_SECRET'),
          signOptions:{expiresIn:'1d'}
        })
       })

  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
