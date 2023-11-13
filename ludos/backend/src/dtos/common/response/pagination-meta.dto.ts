import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationMetaDto {
  @Expose()
  @ApiProperty()
  totalItem: number;
  @Expose()
  @ApiProperty()
  itemCount: number;
  @Expose()
  @ApiProperty()
  itemsPerPage: number;
  @Expose()
  @ApiProperty()
  totalPages: number;
  @Expose()
  @ApiProperty()
  currentPage: number;
}
