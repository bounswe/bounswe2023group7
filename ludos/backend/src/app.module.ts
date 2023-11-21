import { MiddlewareConsumer, Module, NestModule, Post } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { GameController } from './controllers/game.controller';
import { PostController } from './controllers/post.controller';
import { ReviewController } from './controllers/review.controller';
import { S3Controller } from './controllers/s3.controller';
import { UserController } from './controllers/user.controller';
import { Game } from './entities/game.entity';
import { ResetPassword } from './entities/reset-password.entity';
import { Review } from './entities/review.entity';
import { User } from './entities/user.entity';
import { TokenDecoderMiddleware } from './middlewares/tokenDecoder.middleware';
import { GameRepository } from './repositories/game.repository';
import { PostRepository } from './repositories/post.repository';
import { ResetPasswordRepository } from './repositories/reset-password.repository';
import { ReviewRepository } from './repositories/review.repository';
import { UserRepository } from './repositories/user.repository';
import { AppService } from './services/app.service';
import { JwtConfigService } from './services/config/jwt-config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { GameService } from './services/game.service';
import { PostService } from './services/post.service';
import { ReviewService } from './services/review.service';
import { S3Service } from './services/s3.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      inject: [JwtConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    TypeOrmModule.forFeature([User, Game, Review, ResetPassword, Post]),
  ],
  controllers: [
    AppController,
    UserController,
    GameController,
    S3Controller,
    ReviewController,
    PostController,
  ],
  providers: [
    AppService,
    UserRepository,
    UserService,
    GameRepository,
    GameService,
    ResetPasswordRepository,
    S3Service,
    ReviewRepository,
    ReviewService,
    PostRepository,
    PostService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenDecoderMiddleware).forRoutes('*');
  }
}
