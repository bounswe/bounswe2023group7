import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { IPaginationMeta, Pagination, paginate } from 'nestjs-typeorm-paginate';

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
  public async findGames(
    page: number,
    limit: number,
    searchKey?: string,
    tags?: string[],
    platforms?: string[],
    publisher?: string,
    developer?: string,
    orderByKey: keyof Game = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Pagination<Game, IPaginationMeta>> {
    const queryBuilder = this.createQueryBuilder('games').where('1=1');
    if (searchKey) {
      searchKey = searchKey.trim().replace(/ /g, ':* & ');
      searchKey += ':*';
      queryBuilder.andWhere(
        `to_tsvector(\'english\', games.title) @@ to_tsquery('${searchKey}')`,
      );
    }
    if (tags) {
      queryBuilder.andWhere('games.tags @> :tags', { tags });
    }
    if (platforms) {
      queryBuilder.andWhere('games.platforms && :platforms', { platforms });
    }
    if (publisher) {
      queryBuilder.andWhere('games.publisher = :publisher', { publisher });
    }
    if (developer) {
      queryBuilder.andWhere('games.developer = :developer', { developer });
    }
    if (orderByKey) {
      queryBuilder.orderBy(`games_${orderByKey}`, order);
    }
    const games = await paginate<Game>(queryBuilder, { page, limit });
    return games;
  }
}
