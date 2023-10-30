import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class ChangePasswordDto {
  @ApiProperty({
    minLength: 8,
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @ApiProperty({
    minLength: 8,
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
