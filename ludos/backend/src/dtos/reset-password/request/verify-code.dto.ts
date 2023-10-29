import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength, IsDate, IsNumberString } from 'class-validator';

export class VerifyCodeDto {
  @ApiProperty({
    example: 'user@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 6,
    example: '930827',
  })
  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  code: string;

  @ApiProperty({
    minLength: 8,
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  newPassword: string;
  
  @ApiProperty({
    example: new Date("2023-10-26 21:56")
  })
  @IsDate()
  timestamp: Date;
}
