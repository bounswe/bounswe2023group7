import { ApiProperty } from "@nestjs/swagger";
import {Expose, Type} from "class-transformer";
import {IsString, ValidateNested, IsNumber, IsOptional} from "class-validator";


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
  
  @ApiProperty({required: false})
  @Expose()
  @Type(() => AnnotationTargetSelectorDto)
  @ValidateNested()
  @IsOptional()
  selector?: AnnotationTargetSelectorDto;

  @ApiProperty({required: false})
  @Expose()
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({required: false})
  @Expose()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({required: false})
  @Expose()
  @IsString()
  @IsOptional()
  format?: string;
}
export class CreateAnnotationDto {
  @ApiProperty()
  @Expose()
  @IsString()
  "@context": string;

  @ApiProperty()
  @Expose()
  @IsString()
  type: string;

  @ApiProperty()
  @Expose()
  @IsString()
  body: string;

  @ApiProperty({type: AnnotationTargetDto})
  @Expose()
  @Type(() => AnnotationTargetDto)
  @ValidateNested()
  target: AnnotationTargetDto;
}