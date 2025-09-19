import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
     configService : ConfigService
  ){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey: configService.get<string>('JWT_SECRET')! || 'supersecretkey'
    })
  }
  async  validate(playload:any){
    return {id:playload.sub,email:playload.email}
  } 

}