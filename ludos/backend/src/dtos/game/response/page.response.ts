import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GameListResponseDto } from './list.response';
import { PaginationMetaDto } from '../../common/response/pagination-meta.dto';

export class GamePageResponseDto {
  @Expose()
  @Type(() => GameListResponseDto)
  @ApiProperty({ type: () => [GameListResponseDto] })
  items: GameListResponseDto[];
  @Expose()
  @Type(() => PaginationMetaDto)
  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;
}
