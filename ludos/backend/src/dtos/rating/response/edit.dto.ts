import { ApiProperty } from '@nestjs/swagger';

export class RatingEditResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  updatedAt: Date;
}
