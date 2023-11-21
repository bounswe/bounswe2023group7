import { ApiProperty } from '@nestjs/swagger';

export class ReviewEditResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  rating?: number;

  @ApiProperty()
  updatedAt: Date;
}