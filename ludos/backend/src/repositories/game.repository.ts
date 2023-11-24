import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { IPaginationMeta, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { RatingRepository } from './rating.repository';

@Injectable()
export class GameRepository extends Repository<Game> {
  constructor(
    dataSource: DataSource,
    private readonly ratingRepository: RatingRepository,
  ) {
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

  public async findGameByIdWithFollowerList(id: string): Promise<Game> {
    const game = await this.findOne({
      where: { id },
      relations: ['followerList'],
    });
    return game;
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
    userId?: string, // This is not the creator, this is used for follow check
    isFollowed?: boolean,
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
    if (userId && isFollowed) {
      const subQuery = this.createQueryBuilder()
        .select('1')
        .from('game_user_follows', 'guf')
        .where(`guf.usersId = '${userId}'`)
        .andWhere('guf.gamesId = games.id')
        .getQuery();
      queryBuilder.andWhere(`EXISTS (${subQuery})`);
    }
    if (orderByKey) {
      queryBuilder.orderBy(`games_${orderByKey}`, order);
    }
    const paginationResult = await paginate<Game>(queryBuilder, {
      page,
      limit,
    });
    if (userId) {
      await Promise.all(
        paginationResult.items.map(async (game) => {
          game.isFollowed = await this.checkIfGameIsFollowed(game.id, userId);
          game.userRating = await this.ratingRepository.getUserRatingOfGame(
            game.id,
            userId,
          );
        }),
      );
    }
    return paginationResult;
  }
  private async checkIfGameIsFollowed(
    gameId: string,
    userId: string,
  ): Promise<boolean> {
    const query = this.createQueryBuilder()
      .select('1')
      .from('game_user_follows', 'guf')
      .where(`guf.usersId = '${userId}'`)
      .andWhere('guf.gamesId = :gameId', { gameId });

    const result = await query.getExists();
    return result ? true : false;
  }
}
