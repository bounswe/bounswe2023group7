import { ApiProperty } from '@nestjs/swagger';
import { EntityType } from '../../../enums/entity-type.enum';

export class EntityListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: 'enum', enum: EntityType })
  type: EntityType;

  @ApiProperty()
  content: object;

  @ApiProperty()
  name: string;
}
