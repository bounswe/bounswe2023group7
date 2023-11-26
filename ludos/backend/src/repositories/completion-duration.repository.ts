import { Injectable } from '@nestjs/common';
import { DataSource, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { CompletionDuration } from '../entities/completion-duration.entity';

@Injectable()
export class CompletionDurationRepository extends Repository<CompletionDuration> {
  constructor(dataSource: DataSource) {
    super(CompletionDuration, dataSource.createEntityManager());
  }

  public async createCompletionDuration(
    input: Partial<CompletionDuration>,
  ): Promise<CompletionDuration> {
    const completionDuration = this.create(input);
    await this.save(completionDuration);
    return completionDuration;
  }

  public async findCompletionDurationByUserIdAndGameId(
    userId: string,
    gameId: string,
  ): Promise<number> {
    const result = await this.findOneBy({
      game: { id: gameId },
      user: { id: userId },
    });
    return result ? result.duration : null;
  }

  public async updateCompletionDuration(
    gameId: string,
    userId: string,
    duration: number,
  ): Promise<UpdateResult> {
    const completionDuration = this.create({ duration });
    return await this.update(
      { gameId: gameId, userId: userId },
      completionDuration,
    );
  }

  public async deleteCompletionDuration(
    userId: string,
    gameId: string,
  ): Promise<DeleteResult> {
    return await this.delete({ user: { id: userId }, game: { id: gameId } });
  }
}
