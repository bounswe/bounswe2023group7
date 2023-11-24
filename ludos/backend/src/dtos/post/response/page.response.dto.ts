import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginationMetaDto } from '../../common/response/pagination-meta.dto';
import { PostListResponseDto } from './list.response.dto';

export class PostPageResponseDto {
  @Expose()
  @Type(() => PostListResponseDto)
  @ApiProperty({ type: () => [PostListResponseDto] })
  items: PostListResponseDto[];
  @Expose()
  @Type(() => PaginationMetaDto)
  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;
}
