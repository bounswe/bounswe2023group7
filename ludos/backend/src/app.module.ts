import { MiddlewareConsumer, Module, NestModule, Post } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './controllers/comment.controller';
import { GameController } from './controllers/game.controller';
import { PostController } from './controllers/post.controller';
import { RatingController } from './controllers/rating.controller';
import { ReviewController } from './controllers/review.controller';
import { S3Controller } from './controllers/s3.controller';
import { SearchController } from './controllers/search.controller';
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
import { CommentService } from './services/comment.service';
import { JwtConfigService } from './services/config/jwt-config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { GameService } from './services/game.service';
import { PostService } from './services/post.service';
import { RatingService } from './services/rating.service';
import { ReviewService } from './services/review.service';
import { S3Service } from './services/s3.service';
import { SearchService } from './services/search.service';
import { UserService } from './services/user.service';
import { Entity } from './entities/entity.entity';
import { EntityService } from './services/entity.service';
import { EntityRepository } from './repositories/entity.repository';
import { EntityController } from './controllers/entity.controller';
import { CompletionDuration } from './entities/completion-duration.entity';
import { CompletionDurationRepository } from './repositories/completion-duration.repository';
import { Group } from './entities/group.entity';
import { GroupController } from './controllers/group.controller';
import { GroupRepository } from './repositories/group.repository';
import { GroupService } from './services/group.service';
import { AnnotationController } from './controllers/annotation.controller';
import { AnnotationService } from './services/annotation.service';

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
    TypeOrmModule.forFeature([
      User,
      Game,
      Review,
      ResetPassword,
      Post,
      CompletionDuration,
    ]),
    TypeOrmModule.forFeature([
      User,
      Game,
      Review,
      ResetPassword,
      Rating,
      Comment,
      Entity,
      Group,
    ]),
  ],
  controllers: [
    SearchController,
    UserController,
    GameController,
    S3Controller,
    ReviewController,
    PostController,
    RatingController,
    CommentController,
    EntityController,
    GroupController,
    AnnotationController
  ],
  providers: [
    SearchService,
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
    CompletionDurationRepository,
    GroupRepository,
    GroupService,
    AnnotationService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenDecoderMiddleware).forRoutes('*');
  }
}
