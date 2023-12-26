import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { ResetPassword } from '../../entities/reset-password.entity';
import { Game } from '../../entities/game.entity';
import { Comment } from '../../entities/comment.entity';
import { Review } from '../../entities/review.entity';
import { Post } from '../../entities/post.entity';
import { Rating } from '../../entities/rating.entity';
import { Entity } from '../../entities/entity.entity';
import { CompletionDuration } from '../../entities/completion-duration.entity';
import { Group } from '../../entities/group.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_NAME'),
      ...(process.env.PROD && {
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),

      entities: [
        User,
        ResetPassword,
        Game,
        Review,
        Rating,
        Comment,
        Post,
        Entity,
        CompletionDuration,
        Group,
      ],
      synchronize: true,
    };
  }
}
