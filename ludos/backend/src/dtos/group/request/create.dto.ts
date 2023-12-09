import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class GroupCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  gameId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maxNumberOfMembers: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty({
    description: 'Optional list of tags',
    required: false,
  })
  @IsArray()
  @IsOptional()
  tags?: string[];
}
