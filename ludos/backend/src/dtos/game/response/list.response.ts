import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GameListResponseDto {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty()
  title: string;
  @Expose()
  @ApiProperty()
  coverLink: string;
  @Expose()
  @ApiProperty()
  averageRating: number;
  @Expose()
  @ApiProperty()
  platforms: string[];
  @Expose()
  @ApiProperty()
  tags: string[];
  @Expose()
  @ApiProperty()
  followers: number;
  @Expose()
  @ApiProperty()
  developer: string;
  @Expose()
  @ApiProperty()
  publisher: string;
  @Expose()
  @ApiProperty()
  ageRestriction: string;
  @Expose()
  @ApiProperty()
  isFollowed?: boolean;

  @Expose()
  @ApiProperty()
  userRating?: number;

  @Expose()
  @ApiProperty()
  userCompletionDuration?: number;

  @Expose()
  @ApiProperty()
  averageCompletionDuration?: number;
}
