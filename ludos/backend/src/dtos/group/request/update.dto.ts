import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class GroupUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxNumberOfMembers: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
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
