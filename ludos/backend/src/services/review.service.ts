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
import { log } from 'console';
  
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
    
        console.log(game.reviews);  
        return {
          id: review.id,
          rating: review.rating,
          content: review.content,
          userId: review.user.id,
          gameId: review.game.id,
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


    public async likeReview(userId: string, reviewId: string): Promise<void> {
      try {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
          throw new NotFoundException('User Not Found!');
        }

        const review = await this.reviewRepository.findReviewByIdWithLikedUsers(reviewId);
        if (!review) {
          throw new NotFoundException('Review Not Found!');
        }
  
        if (review.likedUsers.find(likedUser => likedUser.id === userId)) {
          log("User already liked the review.");
          review.likedUsers = review.likedUsers.filter(likedUser => likedUser.id !== userId);
        }
        else {
          review.likedUsers.push(user);
        }
        
        await this.reviewRepository.updateReview(review);

      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }


    public async dislikeReview(userId: string, reviewId: string): Promise<void> {
      try {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
          throw new NotFoundException('User Not Found!');
        }

        const review = await this.reviewRepository.findReviewByIdWithDislikedUsers(reviewId);
        if (!review) {
          throw new NotFoundException('Review Not Found!');
        }
  
        if (review.dislikedUsers.find(dislikedUser => dislikedUser.id === userId)) {
          log('User has already disliked the review.');
          review.dislikedUsers = review.dislikedUsers.filter(dislikedUser => dislikedUser.id !== userId);
        }

        else {
          review.dislikedUsers.push(user);
        }

        await this.reviewRepository.updateReview(review);
        
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }

    public async deleteReview(userId: string, reviewId: string): Promise<void> {
      try {

        const review = await this.reviewRepository.findReviewById(reviewId);
        if (!review) {
          throw new NotFoundException('Review Not Found!');
        }

        const user = await this.userRepository.findUserById(userId);
        if (!user) {
          throw new NotFoundException('User Not Found!');
        }
        
        await this.reviewRepository.deleteReview(reviewId);
  
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  

  }
  