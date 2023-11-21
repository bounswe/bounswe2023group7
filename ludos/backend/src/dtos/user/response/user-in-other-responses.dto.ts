import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserInOtherResponsesDto {
  @ApiProperty()
  @Expose()
  id: string;
  @ApiProperty()
  @Expose()
  username: string;
  @ApiProperty()
  @Expose()
  email: string;
  @ApiProperty()
  @Expose()
  avatar: string;
  @ApiProperty()
  @Expose()
  fullName: string;
}
