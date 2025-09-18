import {
  Controller,
  Req,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Res,
  Param,
  UseGuards,
  Body,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

import { Public } from 'src/auth/guards/public.decorator';


@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  getGoogleAuthUrl(
    @Query('role') role: string,
    @Res() res: any,
    @Query('password') password: string,
  ) {
    if (!role || !['doctor', 'patient'].includes(role)) {
      throw new HttpException(
        'Role is required (?role=doctor|patient)',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!password) {
      throw new HttpException(
        'password is required (?role=doctor|patient)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const redirectUri =
      this.configService.get<string>('REDIRECT_URI') ||
      'http://localhost:3000/api/v1/auth/google/callback';
    const parameter = JSON.stringify({ role, password });
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
      client_id: clientId!,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: ['email', 'profile'].join(' '),
      access_type: 'offline',
      prompt: 'consent',
      state: parameter,
    });

    return res.redirect(`${rootUrl}?${params.toString()}`);
  }

  @Get('google/callback')
  async googleAuthCallback(
    @Query('code') code: string,
    @Query('state') data: string,
  ) {
    try {
      if (!code) {
        throw new HttpException(
          'Authorization code missing',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(data);
      if (!data) {
        throw new HttpException(
          'data missing in state',
          HttpStatus.BAD_REQUEST,
        );
      }

      const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID')!;
      const clientSecret = this.configService.get<string>(
        'GOOGLE_CLIENT_SECRET',
      )!;
      const redirectUri =
        this.configService.get<string>('REDIRECT_URI') ||
        'http://localhost:3000/api/v1/auth/google/callback';

      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      const accessToken = tokenResponse.data.access_token;
      if (!accessToken) {
        throw new HttpException(
          'Failed to get access token',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const googleUser = userResponse.data;
      console.log(userResponse);
      const result = await this.authService.validateGoogleUser({
        email: googleUser.email,
        name: googleUser.name,
        data,
        verificationMethod: 'google',
        isVerified: true,
      });

      return {
        message: 'Google OAuth login successful',
        user: result.newUser,
        token: result.access_token,
      };
    } catch (err) {
      console.error('Google callback error', err?.response?.data ?? err);
      throw new HttpException(
        'Google callback failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  logIn(@Request() req: any) {
    return req.user;
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body:any) {
   
    return this.authService.verifyOtp(body.userId, body.token);
    ;
  }
}
