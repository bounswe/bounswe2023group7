import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { GameRepository } from '../repositories/game.repository';
  import { UserRepository } from '../repositories/user.repository';
  import { ReviewCreateDto } from '../dtos/review/request/create.dto';
  import { ReviewCreateResponseDto } from '../dtos/review/response/create.dto';
  import { ReviewRepository } from '../repositories/review.repository';
  
  @Injectable()
  export class ReviewService {
    constructor(
      private readonly gameRepository: GameRepository,
      private readonly userRepository: UserRepository,
      private readonly reviewRepository: ReviewRepository,
    ) {}
  
    public async createReview(
        userId: string,
        gameId: string,
        reviewCreateDto: ReviewCreateDto,
    ): Promise<ReviewCreateResponseDto> {
      try {
        const user = await this.userRepository.findUserById(userId);
        const game = await this.gameRepository.findGameById(gameId);
        const review = await this.reviewRepository.createReview({
            content: reviewCreateDto.content,
            rating: reviewCreateDto.rating,
            user: user,
            game: game
          });

          user.reviews.push(review);
          game.reviews.push(review);
  
          await Promise.all([
              this.userRepository.save(user),
              this.gameRepository.save(game),
          ]);
          
        return {
          id: review.id,
          rating: review.rating,
          content: review.content,
          user: review.user,
          game: review.game,
          createdAt: review.createdAt,
        };
      } catch (e) {
        console.log(e)
        if (e.code == '23505') {
          throw new ConflictException(e.detail);
        }
        throw new InternalServerErrorException();
      }
    }
  

  }
  