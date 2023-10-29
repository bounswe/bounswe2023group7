import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';
export class ChangePasswordDto {
  @ApiProperty({
    example: 'userId',
  })
  @IsString()
  userId: string;
  @ApiProperty({
    minLength: 8,
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty({
    minLength: 8,
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  newPassword: string;

  @ApiProperty({
    example: 'accessToken',
  })
  @IsString()
  accessToken: string;
}

