import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AnnotationService } from '../services/annotation.service';
import { AnnotationResponseDto } from '../dtos/annotation/response/response.dto';
import { CreateAnnotationDto } from '../dtos/annotation/request/create.dto';

@ApiTags('annotation')
@Controller('annotation')
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}
  @ApiOperation({ summary: 'Create Annotation For Game Bio of Game Endpoint' })
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Post('gamebio/:gameId')
  public async createAnnotationForGameBio(
    @Body() input: CreateAnnotationDto,
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameBio(
      input,
      gameId,
    );
  }
  @ApiOperation({
    summary: 'Create Annotation For Game Story of Game Endpoint',
  })
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Post('gamestory/:gameId')
  public async createAnnotationForGameStory(
    @Body() input: CreateAnnotationDto,
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameStory(
      input,
      gameId,
    );
  }
  @ApiOperation({
    summary: 'Create Annotation For Game Guide of Game Endpoint',
  })
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Post('gameguide/:gameId')
  public async createAnnotationForGameGuide(
    @Body() input: CreateAnnotationDto,
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameGuide(
      input,
      gameId,
    );
  }
  @ApiOperation({
    summary: 'Create Annotation For Game Trivia of Game Endpoint',
  })
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Post('gametrivia/:gameId')
  public async createAnnotationForGameTrivia(
    @Body() input: CreateAnnotationDto,
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameTrivia(
      input,
      gameId,
    );
  }
  @ApiOperation({
    summary: 'Create Annotation For Entity Description Endpoint',
  })
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @Post('entity/:entityId')
  public async createAnnotationForEntity(
    @Body() input: CreateAnnotationDto,
    @Param('entityId') entityId: string,
  ): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForEntity(
      input,
      entityId,
    );
  }
  @ApiOperation({ summary: 'Create Annotation For Post Endpoint' })
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Post not found',
  })
  @Post('post/:postId')
  public async createAnnotationForPost(
    @Body() input: CreateAnnotationDto,
    @Param('postId') postId: string,
  ): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForPost(input, postId);
  }
  @ApiOperation({ summary: 'Get Annotations For Game Bio of Game Endpoint' })
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Get('gamebio/:gameId')
  public async getAnnotationsForGameBio(
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameBio(gameId);
  }
  @ApiOperation({ summary: 'Get Annotations For Game Story of Game Endpoint' })
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Get('gamestory/:gameId')
  public async getAnnotationsForGameStory(
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameStory(gameId);
  }
  @ApiOperation({ summary: 'Get Annotations For Game Guide of Game Endpoint' })
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Get('gameguide/:gameId')
  public async getAnnotationsForGameGuide(
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameGuide(gameId);
  }
  @ApiOperation({ summary: 'Get Annotations For Game Trivia of Game Endpoint' })
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Game not found',
  })
  @Get('gametrivia/:gameId')
  public async getAnnotationsForGameTrivia(
    @Param('gameId') gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameTrivia(gameId);
  }
  @ApiOperation({ summary: 'Get Annotations For Entity Description Endpoint' })
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @Get('entity/:entityId')
  public async getAnnotationsForEntity(
    @Param('entityId') entityId: string,
  ): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForEntity(entityId);
  }
  @ApiOperation({ summary: 'Get Annotations For Post Endpoint' })
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Post not found',
  })
  @Get('post/:postId')
  public async getAnnotationsForPost(
    @Param('postId') postId: string,
  ): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForPost(postId);
  }

  @ApiOperation({ summary: 'Delete annotation with id' })
  @ApiOkResponse({
    description: 'Annotation is deleted successfully.',
    status: 204,
  })
  @ApiNotFoundResponse({
    description: 'Annotation with id not found',
  })
  @HttpCode(204)
  @Delete(':source/:type/:itemId/:date')
  public async deleteAnnotationById(
    @Param('source') source: string,
    @Param('type') type: string,
    @Param('itemId') itemId: string,
    @Param('date') date: number,
  ) {
    const annotationId = `${source}/${type}/${itemId}/${date}`;
    return this.annotationService.deleteAnnotationById(annotationId);
  }


  @ApiOperation({ summary: 'Create Annotation For Comment Endpoint' })
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Comment annotation not found',
  })
  @Post('comment/:commentId')
  public async createAnnotationForComment(
    @Body() input: CreateAnnotationDto,
    @Param('commentId') commentId: string,
  ): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForComment(input, commentId);
  }

  @ApiOperation({ summary: 'Get Annotations For Comment Endpoint' })
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Comment not found',
  })
  @Get('comment/:commentId')
  public async getAnnotationsForComment(
    @Param('commentId') commentId: string,
  ): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForComment(commentId);
  }
}
