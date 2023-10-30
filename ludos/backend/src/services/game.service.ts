import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GameRepository } from '../repositories/game.repository';
import { GameCreateDto } from '../dtos/game/request/create.dto';
import { JwtService } from '@nestjs/jwt';
import { GameCreateResponseDto } from '../dtos/game/response/create.response';
import { GameGetResponseDto } from 'dtos/game/response/get.response';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly jwtService: JwtService,
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
      if (e.code == '23505') {
        throw new ConflictException(e.detail);
      }
      throw new InternalServerErrorException();
    }
  }


  public async getGame(id: string): Promise<GameGetResponseDto> {
    const game = await this.gameRepository.findGameById(id);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }
}
