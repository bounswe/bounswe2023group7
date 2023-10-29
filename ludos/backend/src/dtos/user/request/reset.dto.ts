import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsDate } from 'class-validator';
export class ResetDto {
  @ApiProperty({
    example: 'username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'user@email.com',
  })
  @IsEmail()
  email: string;
  
  @ApiProperty({
    example: new Date("2023-10-26 21:56")
  })
  @IsDate()
  timestamp: Date;
}
