import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeResponseDto {
  @ApiProperty({
    description:
      'Verify code sent by email',
  })
  correctCode: boolean;
}
