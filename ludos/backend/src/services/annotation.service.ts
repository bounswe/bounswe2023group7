import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CreateAnnotationDto } from '../dtos/annotation/request/create.dto';
import { AnnotationResponseDto } from '../dtos/annotation/response/response.dto';
import { EntityRepository } from '../repositories/entity.repository';
import { GameRepository } from '../repositories/game.repository';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class AnnotationService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly entityRepository: EntityRepository,
    private readonly postRepository: PostRepository,
  ) {}
  async createAnnotationForGameBio(
    input: CreateAnnotationDto,
    gameId: string,
  ): Promise<AnnotationResponseDto> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.post(
      `http://35.157.67.64:8090/gamebio/${gameId}`,
      input,
    );
    return response.data;
  }
  async createAnnotationForGameStory(
    input: CreateAnnotationDto,
    gameId: string,
  ): Promise<AnnotationResponseDto> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.post(
      `http://35.157.67.64:8090/gamestory/${gameId}`,
      input,
    );
    return response.data;
  }
  async createAnnotationForGameGuide(
    input: CreateAnnotationDto,
    gameId: string,
  ): Promise<AnnotationResponseDto> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.post(
      `http://35.157.67.64:8090/gameguide/${gameId}`,
      input,
    );
    return response.data;
  }
  async createAnnotationForGameTrivia(
    input: CreateAnnotationDto,
    gameId: string,
  ): Promise<AnnotationResponseDto> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.post(
      `http://35.157.67.64:8090/gametrivia/${gameId}`,
      input,
    );
    return response.data;
  }
  async createAnnotationForEntity(
    input: CreateAnnotationDto,
    entityId: string,
  ): Promise<AnnotationResponseDto> {
    const entity = await this.entityRepository.findEntityById(entityId);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${entityId} not found`);
    }
    const response = await axios.post(
      `http://35.157.67.64:8090/entity/${entityId}`,
      input,
    );
    return response.data;
  }
  async createAnnotationForPost(
    input: CreateAnnotationDto,
    postId: string,
  ): Promise<AnnotationResponseDto> {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
    const response = await axios.post(
      `http://35.157.67.64:8090/post/${postId}`,
      input,
    );
    return response.data;
  }
  async getAnnotationsForGameBio(
    gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.get(
      `http://35.157.67.64:8090/gamebio/${gameId}`,
    );
    return response.data;
  }
  async getAnnotationsForGameStory(
    gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.get(
      `http://35.157.67.64:8090/gamestory/${gameId}`,
    );
    return response.data;
  }
  async getAnnotationsForGameGuide(
    gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.get(
      `http://35.157.67.64:8090/gameguide/${gameId}`,
    );
    return response.data;
  }
  async getAnnotationsForGameTrivia(
    gameId: string,
  ): Promise<AnnotationResponseDto[]> {
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }
    const response = await axios.get(
      `http://35.157.67.64:8090/gametrivia/${gameId}`,
    );
    return response.data;
  }
  async getAnnotationsForEntity(
    entityId: string,
  ): Promise<AnnotationResponseDto[]> {
    const entity = await this.entityRepository.findEntityById(entityId);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${entityId} not found`);
    }
    const response = await axios.get(
      `http://35.157.67.64:8090/entity/${entityId}`,
    );
    return response.data;
  }
  async getAnnotationsForPost(
    postId: string,
  ): Promise<AnnotationResponseDto[]> {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
    const response = await axios.get(`http://35.157.67.64:8090/post/${postId}`);
    return response.data;
  }
}
