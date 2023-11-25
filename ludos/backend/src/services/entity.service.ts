import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository } from "../repositories/entity.repository";
import { GameRepository } from "../repositories/game.repository";
import { EntityCreateDto } from "../dtos/entity/request/create.dto";
import { EntityGetResponseDto } from "../dtos/entity/response/get.response.dto";
import { EntityUpdateDto } from "../dtos/entity/request/update.dto";
import { EntityListResponseDto } from "../dtos/entity/response/list.response.dto";

@Injectable()
export class EntityService {
  constructor(private readonly entityRepository: EntityRepository, private readonly gameRepository: GameRepository) {}
  public async createEntity(gameId: string, input: EntityCreateDto) {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException('Game Not Found!');
    }
    return await this.entityRepository.createEntity({game, ...input});
  }
  public async getEntity(id: string): Promise<EntityGetResponseDto> {
    const entity = await this.entityRepository.findEntityById(id);
    if (!entity) {
      throw new NotFoundException('Entity Not Found!');
    }
    return entity;
  }
  public async updateEntity(id: string, input: EntityUpdateDto) {
    const updateResult =  await this.entityRepository.updateEntity(id, input);
    if (!updateResult.affected) {
      throw new NotFoundException('Entity Not Found!');
    }
  }
  public async getEntitiesOfGame(gameId: string): Promise<EntityListResponseDto[]> {
    return await this.entityRepository.findEntitiesByGameId(gameId);
  }
}