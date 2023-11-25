import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EntityService } from '../services/entity.service';
import { EntityCreateDto } from '../dtos/entity/request/create.dto';
import { EntityGetResponseDto } from '../dtos/entity/response/get.response.dto';
import { EntityUpdateDto } from '../dtos/entity/request/update.dto';
import { AuthGuard } from '../services/guards/auth.guard';
import { EntityListResponseDto } from '../dtos/entity/response/list.response.dto';

@Controller('entity')
@ApiTags('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @ApiOperation({ summary: 'Create Entity for a Game' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':gameId')
  createEntity(
    @Body() input: EntityCreateDto,
    @Param('gameId') gameId: string,
  ) {
    return this.entityService.createEntity(gameId, input);
  }

  @ApiOperation({ summary: 'Get Entity By Id' })
  @ApiOkResponse({ type: EntityGetResponseDto })
  @ApiNotFoundResponse({ description: 'Entity Not Found' })
  @Get(':id')
  getEntity(@Param('id') id: string): Promise<EntityGetResponseDto> {
    return this.entityService.getEntity(id);
  }

  @ApiOperation({ summary: 'Update Entity' })
  @ApiNotFoundResponse({ description: 'Entity Not Found' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  updateEntity(@Param('id') id: string, @Body() input: EntityUpdateDto) {
    return this.entityService.updateEntity(id, input);
  }

  @ApiOperation({ summary: 'Get Entities of a game' })
  @ApiOkResponse({ type: [EntityListResponseDto] })
  @Get('/game/:gameId')
  getEntities(
    @Param('gameId') gameId: string,
  ): Promise<EntityListResponseDto[]> {
    return this.entityService.getEntitiesOfGame(gameId);
  }
}
