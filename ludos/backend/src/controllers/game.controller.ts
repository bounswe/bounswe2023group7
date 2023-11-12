import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GameCreateDto } from '../dtos/game/request/create.dto';
import { GameCreateResponseDto } from '../dtos/game/response/create.response';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { GameService } from '../services/game.service';
import { AuthGuard } from '../services/guards/auth.guard';
import { Game } from '../entities/game.entity';
import { GamePageResponseDto } from '../dtos/game/response/page.response';
import { SerializerInterceptor } from '../interceptors/customSerializer.interceptor';

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
  @ApiOperation({ summary: 'List games' })
  @ApiQuery({ name: 'page', required: false, description: 'Default is 1' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of the items in the page. Default is 10',
  })
  @ApiQuery({
    name: 'searchKey',
    required: false,
    description: 'Search by title',
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    description: 'Comma separated list of tags. This filter works like AND',
    example: 'tag1,tag2,tag3',
  })
  @ApiQuery({
    name: 'platforms',
    required: false,
    description: 'Comma separated list of platforms. This filter works like OR',
    example: 'platform1,platform2,platform3',
  })
  @ApiQuery({ name: 'publisher', required: false })
  @ApiQuery({ name: 'developer', required: false })
  @ApiQuery({
    name: 'orderByKey',
    required: false,
    type: 'string',
    description:
      'A game field that will be used for ordering the items. Default is id',
    example: 'followers',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'ASC or DESC. Default is ASC',
    example: 'ASC',
  })
  @ApiOkResponse({
    type: GamePageResponseDto,
  })
  @UseInterceptors(new SerializerInterceptor(GamePageResponseDto))
  @Get()
  public async listGames(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('searchKey') searchKey?: string,
    @Query('tags') tags?: string,
    @Query('platforms') platforms?: string,
    @Query('publisher') publisher?: string,
    @Query('developer') developer?: string,
    @Query('orderByKey') orderByKey?: keyof Game,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    return await this.gameService.listGames(
      page,
      limit,
      searchKey,
      tags,
      platforms,
      publisher,
      developer,
      orderByKey,
      order,
    );
  }
}
