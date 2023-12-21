import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString, ValidateNested, IsNumber } from 'class-validator';

class AnnotationTargetSelectorDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  start: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  end: number;
}
class AnnotationTargetDto {
  @ApiProperty()
  @Expose()
  @IsString()
  source: string;

  @ApiProperty()
  @Expose()
  @Type(() => AnnotationTargetSelectorDto)
  @ValidateNested()
  selector: AnnotationTargetSelectorDto;
}
export class CreateAnnotationDto {
  @ApiProperty()
  @Expose()
  @IsString()
  '@context': string;

  @ApiProperty()
  @Expose()
  @IsString()
  type: string;

  @ApiProperty()
  @Expose()
  @IsString()
  body: string;

  @ApiProperty({ type: AnnotationTargetDto })
  @Expose()
  @Type(() => AnnotationTargetDto)
  @ValidateNested()
  target: AnnotationTargetDto;
}
