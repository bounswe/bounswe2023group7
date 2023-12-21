import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse
} from '@nestjs/swagger';
import { AnnotationService } from '../services/annotation.service';
import { CreateAnnotationDto } from '../dtos/annotation/request/create.dto';
import { AnnotationResponseDto } from '../dtos/annotation/response/response.dto';

@ApiTags()
@Controller()
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @Post('gamebio/:gameId')
  public async createAnnotationForGameBio(@Body() input: CreateAnnotationDto, @Param("gameId") gameId: string): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameBio(input, gameId);
  }
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @Post('gamestory/:gameId')
  public async createAnnotationForGameStory(@Body() input: CreateAnnotationDto, @Param("gameId") gameId: string): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameStory(input, gameId);
  }
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @Post('gameguide/:gameId')
  public async createAnnotationForGameGuide(@Body() input: CreateAnnotationDto, @Param("gameId") gameId: string): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameGuide(input, gameId);
  }
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @Post('gametrivia/:gameId')
  public async createAnnotationForGameTrivia(@Body() input: CreateAnnotationDto, @Param("gameId") gameId: string): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForGameTrivia(input, gameId);
  }
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @Post('entity/:entityId')
  public async createAnnotationForEntity(@Body() input: CreateAnnotationDto, @Param("entityId") entityId: string): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForEntity(input, entityId);
  }
  @ApiOkResponse({
    description: 'Annotation created successfully',
    type: AnnotationResponseDto,
  })
  @Post('post/:postId')
  public async createAnnotationForPost(@Body() input: CreateAnnotationDto, @Param("postId") postId: string): Promise<AnnotationResponseDto> {
    return await this.annotationService.createAnnotationForPost(input, postId);
  }
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @Get('gamebio/:gameId')
  public async getAnnotationsForGameBio(@Param("gameId") gameId: string): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameBio(gameId);
  }
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @Get('gamestory/:gameId')
  public async getAnnotationsForGameStory(@Param("gameId") gameId: string): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameStory(gameId);
  }
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @Get('gameguide/:gameId')
  public async getAnnotationsForGameGuide(@Param("gameId") gameId: string): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameGuide(gameId);
  }
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @Get('gametrivia/:gameId')
  public async getAnnotationsForGameTrivia(@Param("gameId") gameId: string): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForGameTrivia(gameId);
  }
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @Get('entity/:entityId')
  public async getAnnotationsForEntity(@Param("entityId") entityId: string): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForEntity(entityId);
  }
  @ApiOkResponse({
    type: [AnnotationResponseDto],
  })
  @Get('post/:postId')
  public async getAnnotationsForPost(@Param("postId") postId: string): Promise<AnnotationResponseDto[]> {
    return await this.annotationService.getAnnotationsForPost(postId);
  }
  @ApiOkResponse({
    type: AnnotationResponseDto,
  })
  @Get(':type/:itemId/:date')
  public async getAnnotationByDate(@Param("type") type: string, @Param("itemId") itemId: string, @Param("date") date: number): Promise<AnnotationResponseDto> {
    return await this.annotationService.getAnnotationByTypeAndItemIdAndDate(type, itemId, date);
  }
}
