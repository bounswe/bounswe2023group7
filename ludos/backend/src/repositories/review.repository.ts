import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

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

}
