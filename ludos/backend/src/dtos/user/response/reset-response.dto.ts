import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsDate } from 'class-validator';

export class ResetResponseDto {
  @ApiProperty({
    example: 'username',
  })
  @IsString()
  username: string;
}
