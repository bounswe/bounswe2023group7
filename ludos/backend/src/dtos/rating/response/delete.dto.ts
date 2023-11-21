import { ApiProperty } from '@nestjs/swagger';

export class RatingDeleteResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    example: 'Rating is deleted!',
  })
  message: string;
}