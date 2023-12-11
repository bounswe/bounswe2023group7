import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { GroupCreateDto } from '../dtos/group/request/create.dto';
import { GroupUpdateDto } from '../dtos/group/request/update.dto';
import { GroupCreateResponseDto } from '../dtos/group/response/create.response.dto';
import { GroupGetResponseDto } from '../dtos/group/response/get.response.dto';
import { GroupPageResponseDto } from '../dtos/group/response/page.response.dto';
import { Group } from '../entities/group.entity';
import { SerializerInterceptor } from '../interceptors/customSerializer.interceptor';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { GroupService } from '../services/group.service';
import { AuthGuard } from '../services/guards/auth.guard';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiCreatedResponse({
    description: 'Group created successfully',
    type: GroupCreateResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiForbiddenResponse({
    description: 'User should login',
  })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @UseInterceptors(new SerializerInterceptor(GroupCreateResponseDto))
  @ApiOperation({ summary: 'Create Group Endpoint' })
  @ApiBearerAuth()
  @Post()
  public async createGroup(
    @Body() input: GroupCreateDto,
    @Req() req: AuthorizedRequest,
  ) {
    const createdGroup = await this.groupService.createGroup(
      req.user.id,
      input,
    );
    return createdGroup;
  }

  @ApiOkResponse({ type: GroupGetResponseDto })
  @ApiOperation({ summary: 'Get Group by ID Endpoint' })
  @ApiBearerAuth()
  @UseInterceptors(new SerializerInterceptor(GroupGetResponseDto))
  @Get(':id')
  public async getGroup(
    @Req() req: AuthorizedRequest,
    @Param('id') id: string,
  ) {
    return await this.groupService.getGroup(id, req.user && req.user.id);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Join a Group' })
  @ApiNotFoundResponse({ description: 'Group is not found!' })
  @ApiConflictResponse({ description: 'Group is already joined!' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @UseGuards(AuthGuard)
  @Put('/join/:groupId')
  public async joinGroup(
    @Req() req: AuthorizedRequest,
    @Param('groupId') groupId: string,
  ) {
    await this.groupService.joinGroup(req.user.id, groupId);
    return HttpStatus.OK;
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Leave a group, group admin can not leave the group',
  })
  @ApiNotFoundResponse({ description: 'Group is not found!' })
  @ApiConflictResponse({ description: 'Group is not joined!' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @UseGuards(AuthGuard)
  @Put('/leave/:groupId')
  public async leaveGroup(
    @Req() req: AuthorizedRequest,
    @Param('groupId') groupId: string,
  ) {
    await this.groupService.leaveGroup(req.user.id, groupId);
    return HttpStatus.OK;
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove user from a group' })
  @ApiNotFoundResponse({
    description: 'Group is not found or User is not found',
  })
  @ApiConflictResponse({ description: 'Group is not joined!' })
  @ApiForbiddenResponse({
    description: 'User should login or User is the admin of the group',
  })
  @UseGuards(AuthGuard)
  @Put('/remove/:groupId/:userId')
  public async removeUserFromeGroup(
    @Req() req: AuthorizedRequest,
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    await this.groupService.removeUserFromGroup(req.user.id, userId, groupId);
    return HttpStatus.OK;
  }
  @ApiOperation({ summary: 'List groups' })
  @ApiQuery({ name: 'page', required: false, description: 'Default is 1' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of the items in the page. Default is 10',
  })
  @ApiQuery({
    name: 'searchKey',
    required: false,
    description: 'Search by name',
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    description: 'Comma separated list of tags. This filter works like AND',
    example: 'tag1,tag2,tag3',
  })
  @ApiQuery({ name: 'gameId', required: false })
  @ApiQuery({ name: 'adminId', required: false })
  @ApiQuery({
    name: 'orderByKey',
    required: false,
    type: 'string',
    description:
      'A group field that will be used for ordering the items. Default is id',
    example: 'name',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'ASC or DESC. Default is ASC',
    example: 'ASC',
  })
  @ApiQuery({
    name: 'isJoined',
    required: false,
    description: 'Filter by joined groups. If false no filter is applied',
    example: 'true',
  })
  @ApiOkResponse({
    type: GroupPageResponseDto,
  })
  @ApiBearerAuth()
  @UseInterceptors(new SerializerInterceptor(GroupPageResponseDto))
  @Get()
  public async listGroups(
    @Req() req: AuthorizedRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('searchKey') searchKey?: string,
    @Query('tags') tags?: string,
    @Query('gameId') gameId?: string,
    @Query('adminId') adminId?: string,
    @Query('orderByKey') orderByKey?: keyof Group,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('isJoined', new DefaultValuePipe(false), ParseBoolPipe)
    isJoined?: boolean,
  ) {
    return await this.groupService.listGroups(
      page,
      limit,
      searchKey,
      tags,
      gameId,
      adminId,
      orderByKey,
      order,
      req.user && req.user.id,
      isJoined,
    );
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Edit Group Endpoint' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({ description: 'Group is not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':groupId')
  public async editGroup(
    @Body() input: GroupUpdateDto,
    @Param('groupId') groupId: string,
    @Req() req: AuthorizedRequest,
  ) {
    await this.groupService.updateGroup(groupId, req.user.id, input);
    return HttpStatus.OK;
  }

  @ApiOkResponse()
  @ApiOperation({ summary: 'Delete Group Endpoint' })
  @ApiNotFoundResponse({ description: 'Group is not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':groupId')
  public async deleteGroup(
    @Param('groupId') groupId: string,
    @Req() req: AuthorizedRequest,
  ) {
    await this.groupService.deleteGroup(groupId, req.user.id);
    return HttpStatus.OK;
  }
}
