import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class ReviewCreateDto {
  @ApiProperty({
    example: 'This game is amazing!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 4.5,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.0)
  @Max(5.0)
  rating: number;
}
