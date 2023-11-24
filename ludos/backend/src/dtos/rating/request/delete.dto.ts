import { ApiProperty } from '@nestjs/swagger';

export class RatingDeleteDto {
  @ApiProperty()
  id: string;
}
