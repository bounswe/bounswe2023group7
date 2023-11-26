import { ApiProperty } from '@nestjs/swagger';
import { EntityType } from '../../../enums/entity-type.enum';
import { IsEnum, IsObject, IsString } from 'class-validator';

export class EntityCreateDto {
  @ApiProperty({
    type: 'enum',
    enum: EntityType,
    example: EntityType.CHARACTER,
  })
  @IsEnum(EntityType)
  type: EntityType;

  @ApiProperty({
    example: {
      image:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_0.jpg',
      role: 'Support',
    },
  })
  @IsObject()
  content: object;

  @ApiProperty({ example: 'Alistar' })
  @IsString()
  name: string;
}
