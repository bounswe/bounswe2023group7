import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor() {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    let time: number;
    const request = context.switchToHttp().getRequest();
    let response: any;
    const method = request.method;
    const url = request.url;
    let status: number;
    const ip = request.ip;
    return next.handle().pipe(
      tap(() => {
        time = Date.now() - now;
        response = context.switchToHttp().getResponse();
        status = response.statusCode;
        console.log({
          method: method,
          url: url,
          status: status,
          duration: time,
          ip: ip,
        });
      }),
    );
  }
}
