import { Repository, DataSource, Like } from 'typeorm';
import { Annotation } from '../entities/annotation.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AnnotationRepository extends Repository<Annotation> {
  constructor(dataSource: DataSource) {
    super(Annotation, dataSource.createEntityManager());
  }
  public async createAnnotation(
    input: Partial<Annotation>,
  ): Promise<Annotation> {
    const annotation = this.create(input);
    await this.insert(annotation);
    return annotation;
  }
  async deleteAnnotation(annotation: Annotation): Promise<void> {
    this.delete(annotation);
  }
  async getAnnotationByAnnotationId(annotationId): Promise<Annotation> {
    return this.findOneBy({
      'id': annotationId
    })
  }
  public getAnnotationsByTypeAndItemId(
    type: string,
    itemId: string,
  ): Promise<Annotation[]> {
    return this.find({
      where: {
        id: Like(`%/${type}/${itemId}/%`),
      },
    });
  }
  public getAnnotationByTypeAndItemIdAndDate(
    type: string,
    itemId: string,
    date: number,
  ): Promise<Annotation> {
    return this.findOne({
      where: {
        id: Like(`%/${type}/${itemId}/${date}`),
      },
    });
  }
}
