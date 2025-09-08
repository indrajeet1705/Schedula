import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  sendHello():object{
    return {message:"Hello world"};
  }
}
