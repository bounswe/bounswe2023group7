import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class RatingCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.0)
  @Max(5.0)
  @ApiProperty()
  rating: number;
}
