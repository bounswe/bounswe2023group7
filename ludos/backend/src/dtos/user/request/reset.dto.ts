import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
export class ResetDto {
  @ApiProperty({
    example: 'user@email.com',
  })
  @IsEmail()
  email: string;
}
