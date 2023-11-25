import { MiddlewareConsumer, Module, NestModule, Post } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { CommentController } from './controllers/comment.controller';
import { GameController } from './controllers/game.controller';
import { PostController } from './controllers/post.controller';
import { RatingController } from './controllers/rating.controller';
import { ReviewController } from './controllers/review.controller';
import { S3Controller } from './controllers/s3.controller';
import { UserController } from './controllers/user.controller';
import { Comment } from './entities/comment.entity';
import { Game } from './entities/game.entity';
import { Rating } from './entities/rating.entity';
import { ResetPassword } from './entities/reset-password.entity';
import { Review } from './entities/review.entity';
import { User } from './entities/user.entity';
import { TokenDecoderMiddleware } from './middlewares/tokenDecoder.middleware';
import { CommentRepository } from './repositories/comment.repository';
import { GameRepository } from './repositories/game.repository';
import { PostRepository } from './repositories/post.repository';
import { RatingRepository } from './repositories/rating.repository';
import { ResetPasswordRepository } from './repositories/reset-password.repository';
import { ReviewRepository } from './repositories/review.repository';
import { UserRepository } from './repositories/user.repository';
import { AppService } from './services/app.service';
import { CommentService } from './services/comment.service';
import { JwtConfigService } from './services/config/jwt-config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { GameService } from './services/game.service';
import { PostService } from './services/post.service';
import { RatingService } from './services/rating.service';
import { ReviewService } from './services/review.service';
import { S3Service } from './services/s3.service';
import { UserService } from './services/user.service';
import { Entity } from './entities/entity.entity';
import { EntityService } from './services/entity.service';
import { EntityRepository } from './repositories/entity.repository';
import { EntityController } from './controllers/entity.controller';

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
    TypeOrmModule.forFeature([
      User,
      Game,
      Review,
      ResetPassword,
      Rating,
      Comment,
      Entity,
    ]),
  ],
  controllers: [
    AppController,
    UserController,
    GameController,
    S3Controller,
    ReviewController,
    PostController,
    RatingController,
    CommentController,
    EntityController,
  ],
  providers: [
    AppService,
    UserRepository,
    UserService,
    GameRepository,
    GameService,
    ResetPasswordRepository,
    S3Service,
    CommentRepository,
    CommentService,
    ReviewRepository,
    ReviewService,
    PostRepository,
    PostService,
    RatingRepository,
    RatingService,
    EntityService,
    EntityRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenDecoderMiddleware).forRoutes('*');
  }
}
