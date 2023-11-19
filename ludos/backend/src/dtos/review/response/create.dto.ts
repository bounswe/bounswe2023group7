import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'entities/game.entity';
import { User } from 'entities/user.entity';

export class ReviewCreateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  user: User;

  @ApiProperty()
  game: Game;
}