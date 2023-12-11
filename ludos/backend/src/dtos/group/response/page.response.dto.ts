import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginationMetaDto } from '../../common/response/pagination-meta.dto';
import { GroupListResponseDto } from './list.response.dto';

export class GroupPageResponseDto {
  @Expose()
  @Type(() => GroupListResponseDto)
  @ApiProperty({ type: () => [GroupListResponseDto] })
  items: GroupListResponseDto[];
  @Expose()
  @Type(() => PaginationMetaDto)
  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;
}
