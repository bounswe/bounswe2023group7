import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnotationDto } from '../dtos/annotation/request/create.dto';
import { AnnotationResponseDto } from '../dtos/annotation/response/response.dto';
import { Annotation } from '../entities/annotation.entity';
import { AnnotationRepository } from '../repositories/annotation.repository';

@Injectable()
export class AnnotationService{
    constructor(private readonly annotationRepository: AnnotationRepository){}
    async createAnnotationForGameBio(input: CreateAnnotationDto, gameId: string): Promise<AnnotationResponseDto> {
      const id = "35.157.67.64:8090/gamebio/" + gameId + "/" + Date.now();
      return await this.annotationRepository.createAnnotation({
        id,
        ...input,
      });
    }
    async createAnnotationForGameStory(input: CreateAnnotationDto, gameId: string): Promise<AnnotationResponseDto> {
      const id = "35.157.67.64:8090/gamestory/" + gameId + "/" + Date.now();
      return await this.annotationRepository.createAnnotation({
        id,
        ...input,
      });
    }
    async createAnnotationForGameGuide(input: CreateAnnotationDto, gameId: string): Promise<AnnotationResponseDto> {
      const id = "35.157.67.64:8090/gameguide/" + gameId + "/" + Date.now();
      return await this.annotationRepository.createAnnotation({
        id,
        ...input,
      });
    }
    async createAnnotationForGameTrivia(input: CreateAnnotationDto, gameId: string): Promise<AnnotationResponseDto> {
      const id = "35.157.67.64:8090/gametrivia/" + gameId + "/" + Date.now();
      return await this.annotationRepository.createAnnotation({
        id,
        ...input,
      });
    }
    async createAnnotationForEntity(input: CreateAnnotationDto, entityId: string): Promise<AnnotationResponseDto> {
      const id = "35.157.67.64:8090/entity/" + entityId + "/" + Date.now();
      return await this.annotationRepository.createAnnotation({
        id,
        ...input,
      });
    }
    async createAnnotationForPost(input: CreateAnnotationDto, postId: string): Promise<AnnotationResponseDto> {
      const id = "35.157.67.64:8090/post/" + postId + "/" + Date.now();
      return await this.annotationRepository.createAnnotation({
        id,
        ...input,
      });
    }
    async getAnnotationsForGameBio(gameId: string): Promise<AnnotationResponseDto[]> {
      return await this.annotationRepository.getAnnotationsByTypeAndItemId("gamebio", gameId);
    }
    async getAnnotationsForGameStory(gameId: string): Promise<AnnotationResponseDto[]> {
      return await this.annotationRepository.getAnnotationsByTypeAndItemId("gamestory", gameId);
    }
    async getAnnotationsForGameGuide(gameId: string): Promise<AnnotationResponseDto[]> {
      return await this.annotationRepository.getAnnotationsByTypeAndItemId("gameguide", gameId);
    }
    async getAnnotationsForGameTrivia(gameId: string): Promise<AnnotationResponseDto[]> {
      return await this.annotationRepository.getAnnotationsByTypeAndItemId("gametrivia", gameId);
    }
    async getAnnotationsForEntity(entityId: string): Promise<AnnotationResponseDto[]> {
      return await this.annotationRepository.getAnnotationsByTypeAndItemId("entity", entityId);
    }
    async getAnnotationsForPost(postId: string): Promise<AnnotationResponseDto[]> {
      return await this.annotationRepository.getAnnotationsByTypeAndItemId("post", postId);
    }
    async getAnnotationByTypeAndItemIdAndDate(type: string, itemId: string, date: number): Promise<Annotation> {
      return await this.annotationRepository.getAnnotationByTypeAndItemIdAndDate(type, itemId, date);
    }
    async deleteAnnotationById(annotationId: string): Promise<void> {
      const annotation = await this.annotationRepository.getAnnotationByAnnotationId(annotationId);
      if (!annotation){
        throw new NotFoundException('Annotation cannot be found.')
      }
      return this.annotationRepository.deleteAnnotation(annotation);
    }
}