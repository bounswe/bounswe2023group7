import { Injectable } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { DataSource, Repository } from 'typeorm';

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

}
