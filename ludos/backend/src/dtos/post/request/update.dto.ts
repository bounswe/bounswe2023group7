import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class PostUpdateDto {
  @ApiProperty({
    example: 'Post Title',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Content of the post',
  })
  @IsString()
  @IsOptional()
  body?: string;

  @ApiProperty({
    description: 'Content of the post',
  })
  @IsUUID()
  @IsOptional()
  gameId?: string;

  @ApiProperty({
    description: 'Optional list of links for media',
    required: false,
  })
  @IsArray()
  @IsOptional()
  media: string[];

  @ApiProperty({
    description: 'Optional list of tags',
    required: false,
  })
  @IsArray()
  @IsOptional()
  tags: string[];
}
