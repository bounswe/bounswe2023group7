import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { Payload } from '../interfaces/user/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenDecoderMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: AuthorizedRequest, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    try {
      const payload: Payload = await this.jwtService.verifyAsync(token);
      req.user = payload;
    } catch {}
    next();
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
