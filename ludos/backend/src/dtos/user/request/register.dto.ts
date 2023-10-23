import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';
export class RegisterDto {
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
    minLength: 8,
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
