import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Game } from 'entities/game.entity';
import { GameCreateDto } from '../dtos/game/request/create.dto';
import { GameCreateResponseDto } from '../dtos/game/response/create.response';
import { GameRepository } from '../repositories/game.repository';
import { UserRepository } from '../repositories/user.repository';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createGame(
    input: GameCreateDto,
  ): Promise<GameCreateResponseDto> {
    try {
      const game = await this.gameRepository.createGame(input);
      return {
        id: game.id,
        title: game.title,
        coverLink: game.coverLink,
        gameBio: game.gameBio,
        releaseDate: game.releaseDate,
        developer: game.developer,
      };
    } catch (e) {
      console.log(e)
      if (e.code == '23505') {
        throw new ConflictException(e.detail);
      }
      throw new InternalServerErrorException();
    }
  }

  public async getGame(id: string, userId?: string): Promise<Game> {
    const game = await this.gameRepository.findGameByIdWithFollowerList(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    game.isFollowed = userId
      ? game.followerList.some((user) => user.id === userId)
      : false;
    return game;
  }
  async followGame(userId: string, gameId: string): Promise<void> {
    const game = await this.gameRepository.findGameByIdWithFollowerList(gameId);
    if (!game) {
      throw new NotFoundException('Game Not Found!');
    }
    if (game.followerList.filter((user) => user.id === userId).length != 0) {
      throw new ConflictException('The game is followed already!');
    }
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }

    game.followerList.push(user);

    await this.gameRepository.updateGame(game);
  }

  async unfollowGame(userId: string, gameId: string): Promise<void> {
    const game = await this.gameRepository.findGameByIdWithFollowerList(gameId);
    if (!game) {
      throw new NotFoundException('Game Not Found!');
    }
    if (game.followerList.filter((user) => user.id === userId).length == 0) {
      throw new ConflictException('The Game is not followed!');
    }
    game.followerList = game.followerList.filter((user) => user.id !== userId);

    await this.gameRepository.updateGame(game);
  }
  async listGames(
    page: number,
    limit: number,
    searchKey?: string,
    tags?: string,
    platforms?: string,
    publisher?: string,
    developer?: string,
    orderByKey?: keyof Game,
    order?: 'ASC' | 'DESC',
  ): Promise<Pagination<Game, IPaginationMeta>> {
    const tagList = tags ? tags.split(',') : undefined;
    const platformList = platforms ? platforms.split(',') : undefined;
    return await this.gameRepository.findGames(
      page,
      limit,
      searchKey,
      tagList,
      platformList,
      publisher,
      developer,
      orderByKey,
      order,
    );
  }
}
