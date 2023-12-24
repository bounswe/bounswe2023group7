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
import { ReviewEditDto } from '../dtos/review/request/edit.dto';
import { ReviewEditResponseDto } from '../dtos/review/response/edit.dto';
import { ReviewGetInfoResponseDto } from '../dtos/review/response/getInfo.dto';

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
      const existingReview =
        await this.reviewRepository.findReviewByUserIdAndGameId(userId, gameId);

      if (existingReview) {
        throw new ConflictException(
          'User has already submitted a review for this game.',
        );
      }

      const user = await this.userRepository.findUserById(userId);
      const game = await this.gameRepository.findGameById(gameId);
      const review = await this.reviewRepository.createReview({
        content: reviewCreateDto.content,
        rating: reviewCreateDto.rating,
        user: user,
        game: game,
      });

      return {
        id: review.id,
        rating: review.rating,
        content: review.content,
        userId: review.user.id,
        gameId: review.game.id,
        createdAt: review.createdAt,
      };
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundException) {
        throw e;
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
      const review =
        await this.reviewRepository.findReviewByIdWithLikedAndDislikedUsers(
          reviewId,
        );
      if (!review) {
        throw new NotFoundException('Review Not Found!');
      }

      if (review.likedUsers.find((likedUser) => likedUser.id === userId)) {
        log('User already liked the review.');
        review.likedUsers = review.likedUsers.filter(
          (likedUser) => likedUser.id !== userId,
        );
      } else if (
        review.dislikedUsers.find((dislikedUser) => dislikedUser.id === userId)
      ) {
        log('User has already disliked the review.');
        review.dislikedUsers = review.dislikedUsers.filter(
          (dislikedUser) => dislikedUser.id !== userId,
        );
        review.likedUsers.push(user);
      } else {
        review.likedUsers.push(user);
      }

      await this.reviewRepository.updateReview(review);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      } else {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  public async dislikeReview(userId: string, reviewId: string): Promise<void> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User Not Found!');
      }

      const review =
        await this.reviewRepository.findReviewByIdWithLikedAndDislikedUsers(
          reviewId,
        );
      if (!review) {
        throw new NotFoundException('Review Not Found!');
      }

      if (
        review.dislikedUsers.find((dislikedUser) => dislikedUser.id === userId)
      ) {
        log('User has already disliked the review.');
        review.dislikedUsers = review.dislikedUsers.filter(
          (dislikedUser) => dislikedUser.id !== userId,
        );
      } else if (
        review.likedUsers.find((likedUser) => likedUser.id === userId)
      ) {
        log('User has already liked the review.');
        review.likedUsers = review.likedUsers.filter(
          (likedUser) => likedUser.id !== userId,
        );
        review.dislikedUsers.push(user);
      } else {
        review.dislikedUsers.push(user);
      }

      await this.reviewRepository.updateReview(review);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      } else {
        console.log(e);
        throw new InternalServerErrorException();
      }
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
      if (e instanceof NotFoundException) {
        throw e;
      } else {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  public async editReview(
    userId: string,
    reviewId: string,
    reviewEditDto: ReviewEditDto,
  ): Promise<ReviewEditResponseDto> {
    try {
      const review = await this.reviewRepository.findReviewById(reviewId);
      if (!review) {
        throw new NotFoundException('Review Not Found!');
      }

      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User Not Found!');
      }

      if (!reviewEditDto.content && !reviewEditDto.rating) {
        throw new NotFoundException(
          'Please provide at least one field to update!',
        );
      }

      if (reviewEditDto.content) {
        review.content = reviewEditDto.content;
      }

      if (reviewEditDto.rating) {
        review.rating = reviewEditDto.rating;
      }

      await this.reviewRepository.updateReview(review);

      return {
        id: review.id,
        content: reviewEditDto.content,
        rating: reviewEditDto.rating,
        updatedAt: review.updatedAt,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      } else {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  public async getReviewById(
    userId: string | null,
    reviewId: string,
  ): Promise<ReviewGetInfoResponseDto> {
    const review = await this.reviewRepository.findReviewInfoById(reviewId);
    if (!review) {
      throw new NotFoundException('Review Not Found!');
    }

    const likedUserCount = review.likedUsers.length;
    const dislikedUserCount = review.dislikedUsers.length;

    return {
      reviewId: review.id,
      content: review.content,
      rating: review.rating,
      createdAt: review.createdAt,
      userId: review.user.id,
      username: review.user.username,
      gameId: review.game.id,
      likedUserCount: likedUserCount,
      dislikedUserCount: dislikedUserCount,
      isBelongToUser: userId && review.user.id == userId,
      isLikedByUser: userId && review.likedUsers.some((user) => user.id === userId),
      isDislikedByUser: userId && review.dislikedUsers.some((user) => user.id === userId),
    };
  }

  public async getReviewsByGameId(
    userId: string | null,
    gameId: string,
  ): Promise<ReviewGetInfoResponseDto[]> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException('Game Not Found!');
    }


    const reviews = await this.reviewRepository.findReviewsByGame(game);

    const mappedReviews: ReviewGetInfoResponseDto[] = reviews.map((review) => ({
      reviewId: review.id,
      content: review.content,
      rating: review.rating,
      createdAt: review.createdAt,
      userId: review.user.id,
      username: review.user.username,
      gameId: review.game.id,
      likedUserCount: review.likedUsers.length,
      dislikedUserCount: review.dislikedUsers.length,
      isBelongToUser: userId && review.user.id == userId,
      isLikedByUser: userId && review.likedUsers.some((user) => user.id === userId),
      isDislikedByUser: userId && review.dislikedUsers.some((user) => user.id === userId),
    }));
    return mappedReviews;
  }
}
