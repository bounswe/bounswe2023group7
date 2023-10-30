import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GameService } from '../services/game.service';
import { GameCreateResponseDto } from '../dtos/game/response/create.response';
import { GameCreateDto } from '../dtos/game/request/create.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiCreatedResponse({
    description: 'Game created successfully',
    type: GameCreateResponseDto,
  })
  @ApiConflictResponse({
    description: 'Conflict in creating the game',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Game Endpoint' })
  @Post()
  public async createGame(@Body() input: GameCreateDto) {
    const createdGame = await this.gameService.createGame(input);
    return createdGame;
  }
}