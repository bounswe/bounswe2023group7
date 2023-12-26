import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseBoolPipe,
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
import { CompletionDurationCreateDto } from '../dtos/completion-duration/request/create-update.dto';
import { GameCreateDto } from '../dtos/game/request/create.dto';
import { GameCreateResponseDto } from '../dtos/game/response/create.response';
import { GameEditDto } from '../dtos/game/request/edit.dto';
import { GamePageResponseDto } from '../dtos/game/response/page.response';
import { CompletionDuration } from '../entities/completion-duration.entity';
import { Game } from '../entities/game.entity';
import { SerializerInterceptor } from '../interceptors/customSerializer.interceptor';
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
  @ApiQuery({
    name: 'isFollowed',
    required: false,
    description: 'Filter by followed games. If false no filter is applied',
    example: 'true',
  })
  @ApiOkResponse({
    type: GamePageResponseDto,
  })
  @ApiBearerAuth()
  @UseInterceptors(new SerializerInterceptor(GamePageResponseDto))
  @Get()
  public async listGames(
    @Req() req: AuthorizedRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('searchKey') searchKey?: string,
    @Query('tags') tags?: string,
    @Query('platforms') platforms?: string,
    @Query('publisher') publisher?: string,
    @Query('developer') developer?: string,
    @Query('orderByKey') orderByKey?: keyof Game,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('isFollowed', new DefaultValuePipe(false), ParseBoolPipe)
    isFollowed?: boolean,
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
      req.user && req.user.id,
      isFollowed,
    );
  }

  @ApiOperation({ summary: 'Edit Game Endpoint' })
  @ApiCreatedResponse({
    description: 'Game edited',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':gameID/edit')
  public async editGame(
    @Body() input: GameEditDto,
    @Param('gameID') gameID: string,
  ) {
    await this.gameService.editGame(input, gameID);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Completion Duration created successfully.',
    type: CompletionDuration,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiForbiddenResponse({ description: 'User should login' })
  @HttpCode(201)
  @Post('completionDuration/:gameId')
  @ApiOperation({ summary: 'Create Completion Duration Endpoint' })
  public async createCompletionDuration(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
    @Body() completionDurationCreateDto: CompletionDurationCreateDto,
  ) {
    const createdCompletionDuration =
      await this.gameService.addCompletionDuration(
        req.user.id,
        gameId,
        completionDurationCreateDto.duration,
      );
    return createdCompletionDuration;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'CompletionDuration is not found!' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @ApiOperation({ summary: 'Delete Completion Duration Endpoint' })
  @HttpCode(204)
  @Delete('completionDuration/:gameId')
  public async deleteCompletionDuration(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
  ) {
    await this.gameService.deleteCompletionDuration(req.user.id, gameId);
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard)
  @ApiForbiddenResponse({ description: 'User should login' })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'CompletionDuration is not found!' })
  @ApiOperation({ summary: 'Edit Completion Duration Endpoint' })
  @HttpCode(200)
  @Put('completionDuration/:gameId')
  public async editCompletionDuration(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
    @Body() completionDurationUpdateDto: CompletionDurationCreateDto,
  ) {
    await this.gameService.editCompletionDuration(
      req.user.id,
      gameId,
      completionDurationUpdateDto.duration,
    );
    return HttpStatus.OK;
  }

  @ApiOperation({ summary: 'Get Related Games Endpoint' })
  @ApiNotFoundResponse({ description: 'Game is not found!' })
  @Get(':gameId/related')
  public async getRelatedGames(@Param('gameId') gameId: string) {
    const relatedGames = await this.gameService.getRelatedGames(gameId);
    return relatedGames;
  }
}
