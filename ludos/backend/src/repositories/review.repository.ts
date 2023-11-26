import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Game } from '../entities/game.entity';

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  public async createReview(input: Partial<Review>): Promise<Review> {
    const review = this.create(input);
    await this.insert(review);
    return review;
  }

  public findReviewById(id: string): Promise<Review> {
    return this.findOneBy({ id });
  }

  public findReviewByUserIdAndGameId(
    userId: string,
    gameId: string,
  ): Promise<Review | undefined> {
    return this.findOne({
      where: { user: { id: userId }, game: { id: gameId } },
    });
  }

  public findReviewInfoById(id: string): Promise<Review> {
    return this.findOne({
      where: { id },
      relations: ['game', 'user', 'likedUsers', 'dislikedUsers'],
    });
  }

  public findReviewByIdWithLikedAndDislikedUsers(id: string): Promise<Review> {
    return this.findOne({
      where: { id },
      relations: ['likedUsers', 'dislikedUsers'],
    });
  }

  public async updateReview(input: Partial<Review>): Promise<void> {
    const review = this.create(input);
    await this.save(review);
  }

  public async deleteReview(id: string): Promise<void> {
    await this.delete(id);
  }

  public async findReviewsByGame(game: Game): Promise<Review[]> {
    return this.createQueryBuilder('review')
      .leftJoinAndSelect('review.game', 'game')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.likedUsers', 'likedUsers')
      .leftJoinAndSelect('review.dislikedUsers', 'dislikedUsers')
      .where('game.id = :gameId', { gameId: game.id })
      .getMany();
  }
}
