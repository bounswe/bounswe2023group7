import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      },
    };
  }
}
