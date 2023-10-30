import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GameCreateDto } from '../dtos/game/request/create.dto';
import { GameCreateResponseDto } from '../dtos/game/response/create.response';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { GameService } from '../services/game.service';
import { AuthGuard } from '../services/guards/auth.guard';

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
  @ApiBearerAuth()
  @Get(':id')
  public async getGame(@Req() req: AuthorizedRequest, @Param('id') id: string) {
    const game = await this.gameService.getGame(id, req.user && req.user.id);
    if (game) {
      return game;
    } else {
      throw new NotFoundException('Game not found');
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a game' })
  @ApiNotFoundResponse({ description: 'Game is not found!' })
  @ApiConflictResponse({ description: 'Game is already being followed!' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @UseGuards(AuthGuard)
  @Put('/follow/:gameId')
  public async followGame(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
  ) {
    await this.gameService.followGame(req.user.id, gameId);
    return HttpStatus.OK;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a game' })
  @ApiNotFoundResponse({ description: 'Game is not found!' })
  @ApiConflictResponse({ description: 'Game is not being followed!' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @UseGuards(AuthGuard)
  @Put('/unfollow/:gameId')
  public async unfollowGame(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
  ) {
    await this.gameService.unfollowGame(req.user.id, gameId);
    return HttpStatus.OK;
  }
}
