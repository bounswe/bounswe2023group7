import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UpcomingTitleDto } from '../upcomingTitle.dto';

export class PostCreateResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  media: string[];

  @ApiProperty()
  @Expose()
  tags: string[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  upcomingTitle: UpcomingTitleDto;
}
