import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Entity } from '../entities/entity.entity';

@Injectable()
export class EntityRepository extends Repository<Entity> {
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.createEntityManager());
  }

  public async createEntity(input: Partial<Entity>): Promise<Entity> {
    const entity = this.create(input);
    await this.insert(entity);
    return entity;
  }

  public findEntityById(id: string): Promise<Entity> {
    return this.findOne({ where: {id}, relations: {game: true}});
  }

  public findEntitiesByGameId(
    gameId: string,
  ): Promise<Entity[]> {
    return this.findBy({ game: { id: gameId }});
  }

  public async updateEntity(id: string, input: Partial<Entity>): Promise<UpdateResult> {
    const entity = this.create(input);
    return await this.update({id}, entity);
  }

  public async deleteEntity(id: string): Promise<DeleteResult> {
    return await this.delete({id});
  }
}
