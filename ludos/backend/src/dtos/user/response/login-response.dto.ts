import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description:
      'This value should be included in the authorization header of the next requests.',
  })
  accessToken: string;
}
