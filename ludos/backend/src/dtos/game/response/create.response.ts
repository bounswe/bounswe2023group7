import { ApiProperty } from '@nestjs/swagger';

export class GameCreateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  coverLink: string;

  @ApiProperty()
  gameBio: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  developer: string;
}
