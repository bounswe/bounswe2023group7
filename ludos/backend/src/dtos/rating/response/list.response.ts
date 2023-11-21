import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../../../entities/game.entity';

export class RatingListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  game: Game;
  
  @ApiProperty()
  rating: number;
}
