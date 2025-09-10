import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const role = request.query.role;

    // Attach role into Google OAuth state
    request.query.state = role;

    return (await super.canActivate(context)) as boolean;
  }
}
