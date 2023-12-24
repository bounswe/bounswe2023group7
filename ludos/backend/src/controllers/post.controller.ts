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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PostCreateDto } from '../dtos/post/request/create.dto';
import { PostUpdateDto } from '../dtos/post/request/update.dto';
import { PostCreateResponseDto } from '../dtos/post/response/create.response.dto';
import { PostGetResponseDto } from '../dtos/post/response/get.response.dto';
import { PostPageResponseDto } from '../dtos/post/response/page.response.dto';
import { Post as PostEntity } from '../entities/post.entity';
import { SerializerInterceptor } from '../interceptors/customSerializer.interceptor';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { AuthGuard } from '../services/guards/auth.guard';
import { PostService } from '../services/post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiCreatedResponse({
    description: 'Post created successfully',
    type: PostCreateResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(201)
  @ApiForbiddenResponse({ description: 'User should login' })
  @ApiNotFoundResponse({ description: 'Game not found' })
  @ApiOperation({ summary: 'Create Post Endpoint' })
  @ApiBearerAuth()
  @UseInterceptors(new SerializerInterceptor(PostCreateResponseDto))
  @UseGuards(AuthGuard)
  @Post()
  public async createPost(
    @Req() req: AuthorizedRequest,
    @Body() input: PostCreateDto,
  ) {
    const createdPost = await this.postService.createPost(req.user.id, input);
    return createdPost;
  }

  @ApiOkResponse({
    type: PostGetResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Post not found',
  })
  @ApiOperation({ summary: 'Get Post by ID Endpoint' })
  @ApiBearerAuth()
  @UseInterceptors(new SerializerInterceptor(PostGetResponseDto))
  @Get(':id')
  public async getPost(@Req() req: AuthorizedRequest, @Param('id') id: string) {
    return await this.postService.getPost(id, req.user && req.user.id);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Post not found Or does not belong to the user',
  })
  @ApiOperation({ summary: 'Update Post by ID Endpoint' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({ description: 'Game not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  public async updatePost(
    @Req() req: AuthorizedRequest,
    @Param('id') id: string,
    @Body() input: PostUpdateDto,
  ) {
    await this.postService.updatePost(id, input, req.user.id);
  }
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Post not found Or does not belong to the user',
  })
  @ApiOperation({ summary: 'Delete Post by ID Endpoint' })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'User should login' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deletePost(
    @Req() req: AuthorizedRequest,
    @Param('id') id: string,
  ) {
    await this.postService.deletePost(id, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a post, or remove like if liked' })
  @ApiNotFoundResponse({ description: 'Post is not found!' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @UseGuards(AuthGuard)
  @Put('/like/:postId')
  public async likePost(
    @Req() req: AuthorizedRequest,
    @Param('postId') postId: string,
  ) {
    await this.postService.likePost(req.user.id, postId);
    return HttpStatus.OK;
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dislike a post, or remove dislike if disliked' })
  @ApiNotFoundResponse({ description: 'Post is not found!' })
  @ApiForbiddenResponse({ description: 'User should login' })
  @UseGuards(AuthGuard)
  @Put('/dislike/:postId')
  public async dislikePost(
    @Req() req: AuthorizedRequest,
    @Param('postId') postId: string,
  ) {
    await this.postService.dislikePost(req.user.id, postId);
    return HttpStatus.OK;
  }

  @ApiOperation({ summary: 'List posts' })
  @ApiQuery({ name: 'page', required: false, description: 'Default is 1' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of the items in the page. Default is 10',
  })
  @ApiQuery({
    name: 'searchKey',
    required: false,
    description:
      'Search by title or body. This is a full text search. i.e. Completed words should be provided',
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    description: 'Comma separated list of tags. This filter works like AND',
    example: 'tag1,tag2,tag3',
  })
  @ApiQuery({ name: 'gameId', required: false })
  @ApiQuery({
    name: 'groupId',
    required: false,
    description: 'If not specified, posts with group id is null will be listed',
  })
  @ApiQuery({ name: 'ownerUserId', required: false })
  @ApiQuery({
    name: 'isLiked',
    required: false,
    description: 'Filter by liked posts. If false no filter is applied',
    example: 'true',
  })
  @ApiQuery({
    name: 'isDisliked',
    required: false,
    description:
      'Filter by disliked posts. If false no filter is applied. This filter valid if isLiked not true',
    example: 'true',
  })
  @ApiQuery({
    name: 'orderByKey',
    required: false,
    type: 'string',
    description:
      'A post field that will be used for ordering the items. Default is createdAt',
    example: 'numberOfLikes',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'ASC or DESC. Default is DESC',
    example: 'ASC',
  })
  @ApiOkResponse({
    type: PostPageResponseDto,
  })
  @ApiBearerAuth()
  @UseInterceptors(new SerializerInterceptor(PostPageResponseDto))
  @Get()
  public async listPosts(
    @Req() req: AuthorizedRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('searchKey') searchKey?: string,
    @Query('tags') tags?: string,
    @Query('gameId') gameId?: string,
    @Query('groupId') groupId?: string,
    @Query('ownerUserId') ownerUserId?: string,
    @Query('isLiked', new DefaultValuePipe(false), ParseBoolPipe)
    isLiked?: boolean,
    @Query('isDisliked', new DefaultValuePipe(false), ParseBoolPipe)
    isDisliked?: boolean,
    @Query('isUpcomingTitle', new DefaultValuePipe(false), ParseBoolPipe)
    isUpcomingTitle?: boolean,
    @Query('orderByKey') orderByKey?: keyof PostEntity,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    return await this.postService.listPosts(
      page,
      limit,
      searchKey,
      tags,
      gameId,
      groupId,
      ownerUserId,
      req.user && req.user.id,
      isLiked,
      isDisliked,
      isUpcomingTitle,
      orderByKey,
      order,
    );
  }
}
