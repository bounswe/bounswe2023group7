import { ApiProperty } from '@nestjs/swagger';

export class SetProfilePhotoResponseDto {
  @ApiProperty()
  photoUrl: string;
}
