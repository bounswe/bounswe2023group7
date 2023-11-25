import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class GameEditDto {
  @ApiProperty({
    example: 'God of War (2018)',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example:
      'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg',
  })
  @IsString()
  @IsOptional()
  coverLink: string;

  @ApiProperty()
  @IsOptional()
  systemRequirements: {
    minimum: {
      [key: string]: string | boolean;
    };

    recommended: {
      [key: string]: string | boolean;
    };
  };

  @ApiProperty()
  @IsOptional()
  predecessors: string[];

  @ApiProperty()
  @IsOptional()
  successors: string[];

  @ApiProperty({
    example: 'A comprehensive game guide...',
  })
  @IsString()
  @IsOptional()
  gameGuide: string;

  @ApiProperty({
    example: 'An epic adventure set in Norse mythology...',
  })
  @IsString()
  @IsOptional()
  gameStory: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  platforms: string[];

  @ApiProperty({
    example: 'Mature (17+)',
  })
  @IsString()
  @IsOptional()
  ageRestriction: string;

  @ApiProperty({
    example: 'God of War is an action-adventure game...',
  })
  @IsString()
  @IsOptional()
  gameBio: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    example: 'April 20, 2018',
  })
  @IsString()
  @IsOptional()
  releaseDate: Date;

  @ApiProperty({
    example: 'Santa Monica Studio',
  })
  @IsString()
  @IsOptional()
  developer: string;

  @ApiProperty({
    example: 'Sony Interactive Entertainment',
  })
  @IsString()
  @IsOptional()
  publisher: string;

  @ApiProperty({
    example: "Did you know? The game's director...",
  })
  @IsString()
  @IsOptional()
  trivia: string;
}
