import { ApiProperty } from '@nestjs/swagger';
import { EntityType } from '../../../enums/entity-type.enum';
import { GameGetResponseDto } from '../../game/response/get.response';

export class EntityGetResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => GameGetResponseDto })
  game: GameGetResponseDto;

  @ApiProperty({ type: 'enum', enum: EntityType })
  type: EntityType;

  @ApiProperty()
  content: object;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
