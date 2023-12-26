import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateAnnotationDto } from '../request/create.dto';
export class AnnotationResponseDto extends CreateAnnotationDto {
  @ApiProperty()
  @Expose()
  id: string;
}
