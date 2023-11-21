import { ApiProperty } from '@nestjs/swagger';

export class RatingCreateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  gameId: string;
}
