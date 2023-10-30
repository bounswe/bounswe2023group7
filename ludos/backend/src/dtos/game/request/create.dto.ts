import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class GameCreateDto {
  @ApiProperty({
    example: 'God of War (2018)',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg',
  })
  @IsString()
  coverLink: string;

  @ApiProperty()
  systemRequirements: {
    minimum: {
      [key: string]: string | boolean;
    };

    recommended: {
      [key: string]: string | boolean;
    };
  };

  @ApiProperty()
  predecessors: string[];

  @ApiProperty()
  successors: string[];

  @ApiProperty({
    example: 'A comprehensive game guide...',
  })
  @IsString()
  gameGuide: string;

  @ApiProperty({
    example: 'An epic adventure set in Norse mythology...',
  })
  @IsString()
  gameStory: string;

  @ApiProperty()
  @IsArray()
  platforms: string[];

  @ApiProperty({
    example: 'Mature (17+)',
  })
  @IsString()
  ageRestriction: string;

  @ApiProperty({
    example: 'God of War is an action-adventure game...',
  })
  @IsString()
  gameBio: string;

  @ApiProperty()
  @IsArray()
  tags: string[];

  @ApiProperty({
    example: 'April 20, 2018',
  })
  @IsString()
  releaseDate: Date;

  @ApiProperty({
    example: 'Santa Monica Studio',
  })
  @IsString()
  developer: string;

  @ApiProperty({
    example: 'Sony Interactive Entertainment',
  })
  @IsString()
  publisher: string;

  @ApiProperty({
    example: "Did you know? The game's director...",
  })
  @IsString()
  trivia: string;
}
