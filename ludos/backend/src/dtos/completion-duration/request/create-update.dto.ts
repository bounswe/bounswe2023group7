import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CompletionDurationCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  duration: number;
}
