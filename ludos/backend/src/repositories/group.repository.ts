import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Group } from '../entities/group.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(dataSource: DataSource) {
    super(Group, dataSource.createEntityManager());
  }

  public async createGroup(input: Partial<Group>): Promise<Group> {
    const group = this.create(input);
    return await this.save(group);
  }

  public findGroupById(id: string): Promise<Group> {
    return this.findOne({
      where: { id },
      relations: { game: true, admin: true, members: true },
    });
  }

  public async updateGroup(input: Partial<Group>): Promise<void> {
    const group = this.create(input);
    await this.save(group);
  }

  public async deleteGroup(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }

  public async findGroups(
    page: number,
    limit: number,
    searchKey?: string,
    tags?: string[],
    gameId?: string,
    adminId?: string,
    userId?: string, // denotes current user, used for join status
    isJoined?: boolean,
    orderByKey: keyof Group = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Pagination<Group, IPaginationMeta>> {
    const queryBuilder = this.createQueryBuilder('groups')
      .leftJoinAndSelect('groups.admin', 'admin')
      .leftJoinAndSelect('groups.game', 'game')
      .where('1=1');
    if (searchKey) {
      searchKey = searchKey.trim().replace(/ /g, ':* & ');
      searchKey += ':*';
      queryBuilder.andWhere(
        `to_tsvector(\'english\', groups.name) @@ to_tsquery('${searchKey}')`,
      );
    }
    if (tags) {
      queryBuilder.andWhere('groups.tags @> :tags', { tags });
    }
    if (gameId) {
      queryBuilder.andWhere('groups.gameId = :gameId', { gameId });
    }
    if (adminId) {
      queryBuilder.andWhere('groups.adminId = :adminId', { adminId });
    }
    if (userId && isJoined) {
      const subQuery = this.createQueryBuilder()
        .select('1')
        .from('groups_members_users', 'gmu')
        .where(`gmu.usersId = '${userId}'`)
        .andWhere('gmu.groupsId = groups.id')
        .getQuery();
      queryBuilder.andWhere(`EXISTS (${subQuery})`);
    }
    if (orderByKey) {
      queryBuilder.orderBy(`"groups_${orderByKey}"`, order);
    }
    const groups = await paginate<Group>(queryBuilder, { page, limit });
    if (userId) {
      await Promise.all(
        groups.items.map(async (group) => {
          group.isJoined = await this.checkIfGroupIsJoined(group.id, userId);
        }),
      );
    }
    return groups;
  }
  private async checkIfGroupIsJoined(groupId: string, userId: string) {
    const result = await this.createQueryBuilder()
      .select('1')
      .from('groups_members_users', 'gmu')
      .where(`gmu.usersId = '${userId}'`)
      .andWhere('gmu.groupsId = :groupId', { groupId })
      .getExists();
    return result ? true : false;
  }
}
