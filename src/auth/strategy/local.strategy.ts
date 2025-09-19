import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    console.log('in local strategy');

    const user = await this.authService.validateUser(email, password);
    // console.log(data)
    if (!user) {
      throw new Error('try again later!');
    }
    return user ;
  }
}
