import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class RatingEditDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.0)
  @Max(5.0)
  rating: number;
}