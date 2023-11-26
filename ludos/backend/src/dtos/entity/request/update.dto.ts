import { ApiProperty } from '@nestjs/swagger';
import { EntityType } from '../../../enums/entity-type.enum';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

export class EntityUpdateDto {
  @ApiProperty({
    type: 'enum',
    enum: EntityType,
    example: EntityType.CHARACTER,
    required: false,
  })
  @IsEnum(EntityType)
  @IsOptional()
  type: EntityType;

  @ApiProperty({
    example: {
      image:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_0.jpg',
      role: 'Support',
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  content: object;

  @ApiProperty({ example: 'Alistar', required: false })
  @IsString()
  @IsOptional()
  name: string;
}
