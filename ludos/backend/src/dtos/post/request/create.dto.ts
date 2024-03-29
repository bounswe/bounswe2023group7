import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { UpcomingTitleDto } from '../upcomingTitle.dto';

export class PostCreateDto {
  @ApiProperty({
    example: 'Post Title (Optional for now)',
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Content of the post',
  })
  @IsString()
  body: string;

  @ApiProperty({
    description: 'Id of the game',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  gameId?: string;

  @ApiProperty({
    description: 'Id of the group',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  groupId?: string;

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

  @ApiProperty({
    description: 'Upcoming Title',
  })
  upcomingTitle: UpcomingTitleDto;
}
