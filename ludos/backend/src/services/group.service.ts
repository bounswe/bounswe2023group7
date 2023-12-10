import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { GroupCreateDto } from '../dtos/group/request/create.dto';
import { GroupUpdateDto } from '../dtos/group/request/update.dto';
import { GroupGetResponseDto } from '../dtos/group/response/get.response.dto';
import { Group } from '../entities/group.entity';
import { GameRepository } from '../repositories/game.repository';
import { GroupRepository } from '../repositories/group.repository';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly gameRepository: GameRepository,
    private readonly userRepository: UserRepository,
  ) {}
  public async createGroup(userId: string, input: GroupCreateDto) {
    const game = await this.gameRepository.findGameById(input.gameId);
    if (!game) {
      throw new NotFoundException('Game Not Found!');
    }
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    const group = await this.groupRepository.createGroup({
      admin: user,
      game: game,
      maxNumberOfMembers: input.maxNumberOfMembers,
      members: [user],
      name: input.name,
      description: input.description,
      tags: input.tags,
    });
    return group;
  }
  public async getGroup(
    id: string,
    userId?: string,
  ): Promise<GroupGetResponseDto> {
    const group = await this.groupRepository.findGroupById(id);
    if (!group) {
      throw new NotFoundException('Group Not Found!');
    }
    group.isJoined = userId
      ? group.members.some((user) => user.id === userId)
      : false;
    return group;
  }
  public async updateGroup(id: string, userId: string, input: GroupUpdateDto) {
    const group = await this.groupRepository.findGroupById(id);
    if (!group) {
      throw new NotFoundException('Group Not Found!');
    }
    if (group.admin.id !== userId) {
      throw new ForbiddenException('Not Allowed to Edit Group');
    }
    const updateObject = Object.assign(group, input);
    await this.groupRepository.updateGroup(updateObject);
  }

  public async joinGroup(userId: string, groupId: string) {
    const user = await this.userRepository.findUserById(userId);
    const group = await this.groupRepository.findGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group Not Found!');
    }
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    if (group.members.some((user) => user.id == userId)) {
      throw new ConflictException('User is already in the group!');
    }
    if (group.members.length >= group.maxNumberOfMembers) {
      throw new ConflictException('Group is full!');
    }
    group.members.push(user);
    return await this.groupRepository.updateGroup(group);
  }

  public async leaveGroup(userId: string, groupId: string) {
    const user = await this.userRepository.findUserById(userId);
    const group = await this.groupRepository.findGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group Not Found!');
    }
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    if (!group.members.some((user) => user.id == userId)) {
      throw new ConflictException('User is not in the group!');
    }
    group.members = group.members.filter((member) => member.id !== user.id);
    return await this.groupRepository.updateGroup(group);
  }

  public async removeUserFromGroup(
    adminId: string,
    userId: string,
    groupId: string,
  ) {
    const user = await this.userRepository.findUserById(userId);
    const group = await this.groupRepository.findGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group Not Found!');
    }
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    if (group.admin.id != adminId) {
      throw new ForbiddenException('Not Allowed to Edit Group');
    }
    if (group.admin.id == userId) {
      throw new ConflictException('Group admin cannot leave the group!');
    }
    if (!group.members.some((user) => user.id != userId)) {
      throw new ConflictException('User is not in the group!');
    }
    group.members = group.members.filter((member) => member.id !== user.id);
    return await this.groupRepository.updateGroup(group);
  }

  async listGroups(
    page: number,
    limit: number,
    searchKey?: string,
    tags?: string,
    gameId?: string,
    adminId?: string,
    orderByKey?: keyof Group,
    order?: 'ASC' | 'DESC',
    userId?: string,
    isJoined?: boolean,
  ): Promise<Pagination<Group, IPaginationMeta>> {
    const tagList = tags ? tags.split(',') : undefined;
    return await this.groupRepository.findGroups(
      page,
      limit,
      searchKey,
      tagList,
      gameId,
      adminId,
      userId,
      isJoined,
      orderByKey,
      order,
    );
  }

  public async deleteGroup(id: string, userId: string) {
    const group = await this.groupRepository.findGroupById(id);
    if (!group) {
      throw new NotFoundException('Group Not Found!');
    }
    if (group.admin.id != userId) {
      throw new ForbiddenException('Not Allowed to Delete Group');
    }
    await this.groupRepository.deleteGroup(id);
  }
}
