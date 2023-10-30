import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from 'services/guards/auth.guard';

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

  @ApiOperation({ summary: 'Get Game by ID Endpoint' })
  @Get(':id')
  public async getGame(@Param('id') id: string) {
    console.log(id);
    const game = await this.gameService.getGame(id);
    if (game) {
      return game;
    } else {
      throw new NotFoundException('Game not found');
    }
  }
}


