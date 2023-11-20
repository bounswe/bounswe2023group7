import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class ReviewEditDto {
  @ApiProperty({
    example: 'This game is amazing!',
  })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({
    example: 4.5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.0)
  @Max(5.0)
  rating: number;
}
