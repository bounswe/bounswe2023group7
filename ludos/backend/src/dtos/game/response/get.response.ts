import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GameGetResponseDto {
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
  gameBio: string;

  @Expose()
  @ApiProperty()
  releaseDate: Date;

  @Expose()
  @ApiProperty()
  developer: string;

  @Expose()
  @ApiProperty()
  userCompletionDuration?: number;

  @Expose()
  @ApiProperty()
  averageCompletionDuration?: number;
}
