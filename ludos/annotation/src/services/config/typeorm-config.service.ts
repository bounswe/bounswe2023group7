import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Annotation } from '../../entities/annotation.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'postgres',
      username: 'user',
      password: 'password',
      port: 5432,
      database: 'annotation',
      entities: [
        Annotation
      ],
      synchronize: true,
    };
  }
}
