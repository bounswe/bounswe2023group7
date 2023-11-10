import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
export class GetProfilePhotoDto {
  @ApiProperty({
    example: '43',
  })
  @IsNumberString()
  id: string;
}
