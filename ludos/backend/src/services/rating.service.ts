import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GameRepository } from '../repositories/game.repository';
import { UserRepository } from '../repositories/user.repository';
import { RatingCreateDto } from '../dtos/rating/request/create.dto';
import { RatingCreateResponseDto } from '../dtos/rating/response/create.dto';
import { RatingRepository } from '../repositories/rating.repository';
import { RatingEditDto } from '../dtos/rating/request/edit.dto';
import { RatingEditResponseDto } from '../dtos/rating/response/edit.dto';
import { RatingDeleteResponseDto } from 'dtos/rating/response/delete.dto';

@Injectable()
export class RatingService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly userRepository: UserRepository,
    private readonly ratingRepository: RatingRepository,
  ) { }

  public async createRating(
    userId: string,
    gameId: string,
    ratingCreateDto: RatingCreateDto,
  ): Promise<RatingCreateResponseDto> {
    const user = await this.userRepository.findUserById(userId);
    const game = await this.gameRepository.findGameById(gameId);

    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    else if (!game) {
      throw new NotFoundException('Game Not Found!');
    }

    const rating = await this.ratingRepository.createRating({
      rating: ratingCreateDto.rating,
      user: user,
      game: game
    });

    return {
      id: rating.id,
      rating: rating.rating,
      userId: user.id,
      gameId: rating.game.id,
      createdAt: rating.createdAt,
    };
  }

  public async deleteRating(userId: string, ratingId: string): Promise<RatingDeleteResponseDto> {
    const rating = await this.ratingRepository.findRatingById(ratingId);
    if (!rating) {
      throw new NotFoundException('Rating Not Found!');
    }

    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }

    await this.ratingRepository.deleteRating(ratingId);

    return {
      id: rating.id,
      message: "Rating is deleted!"
    };
  }

  public async editRating(
    userId: string,
    ratingId: string,
    ratingEditDto: RatingEditDto,
  ): Promise<RatingEditResponseDto> {
    try {
      const rating = await this.ratingRepository.findRatingById(ratingId);
      if (!rating) {
        throw new NotFoundException('Rating Not Found!');
      }

      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User Not Found!');
      }

      if (!ratingEditDto.rating) {
        throw new NotFoundException('Please provide at least one field to update!');
      }

      rating.rating = ratingEditDto.rating;


      await this.ratingRepository.updateRating(rating);

      return {
        id: rating.id,
        rating: ratingEditDto.rating,
        updatedAt: rating.updatedAt,
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

}
