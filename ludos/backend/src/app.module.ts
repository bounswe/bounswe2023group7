import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { User } from './entities/user.entity';
import { ResetPassword } from './entities/reset-password.entity';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './services/config/jwt-config.service';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { GameRepository } from './repositories/game.repository';
import { Game } from './entities/game.entity';
import { Comment } from './entities/comment.entity';
import { TokenDecoderMiddleware } from './middlewares/tokenDecoder.middleware';
import { ResetPasswordRepository } from './repositories/reset-password.repository';
import { CommentRepository } from './repositories/comment.repository';
import { S3Service } from './services/s3.service';
import { S3Controller } from './controllers/s3.controller';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { ReviewRepository } from './repositories/review.repository';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { Review } from './entities/review.entity';


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
    TypeOrmModule.forFeature([User, Game, ResetPassword, Comment]),
  ],
  controllers: [AppController, UserController, GameController, S3Controller, ReviewController, CommentController],
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenDecoderMiddleware).forRoutes('*');
  }
}
