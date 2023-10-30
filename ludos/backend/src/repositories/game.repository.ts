import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Game } from '../entities/game.entity';

@Injectable()
export class GameRepository extends Repository<Game> {
  constructor(dataSource: DataSource) {
    super(Game, dataSource.createEntityManager());
  }

  public async createGame(input: Partial<Game>): Promise<Game> {
    const game = this.create(input);
    await this.insert(game);
    return game;
  }

  public async findGameById(id: string): Promise<Game> {
    return this.findOneBy({ id });
  }

  public findGameByIdWithFollowerList(id: string): Promise<Game> {
    return this.findOne({ where: { id }, relations: ['followerList'] });
  }

  public async updateGame(input: Partial<Game>): Promise<void> {
    const game = this.create(input);
    await this.save(game);
  }
}
