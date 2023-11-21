import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';

@Injectable()
export class RatingRepository extends Repository<Rating> {
  constructor(dataSource: DataSource) {
    super(Rating, dataSource.createEntityManager());
  }

  public async createRating(input: Partial<Rating>): Promise<Rating> {
    const rating = this.create(input);
    await this.save(rating);
    return rating;
  }

  public findRatingById(id: string): Promise<Rating> {
    return this.findOneBy({ id });
  }

  public async updateRating(input: Partial<Rating>): Promise<void> {
    const rating = this.create(input);
    await this.save(rating);
  }

  public async deleteRating(id: string): Promise<void> {
    await this.delete(id);
  }

}
