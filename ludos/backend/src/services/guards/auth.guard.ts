import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthorizedRequest } from '../../interfaces/common/authorized-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthorizedRequest = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    return true;
  }
}
