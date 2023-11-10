import { ApiProperty } from '@nestjs/swagger';

export class GetProfilePhotoResponseDto {
  @ApiProperty()
  photo: File;
}
