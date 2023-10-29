import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNumber, IsString} from 'class-validator';

export class GameCreateDTO {
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

    @ApiProperty({
        example: 4.8,
    })
    @IsNumber()
    averageRating: number;

    @ApiProperty({
        example: 4,
    })
    @IsNumber()
    userRating: number;

    @ApiProperty({
        example: 5000000,
    })
    @IsNumber()
    followers: number;

    @ApiProperty()
    systemRequirements: {
        minimum: {
            [key: string]: string | boolean;
        };

        recommended: {
            [key: string]: string | boolean;
        };
    };

    @ApiProperty({
        example: 45,
    })
    @IsNumber()
    userCompilationDuration: number;

    @ApiProperty({
        example: 45.5,
    })
    @IsNumber()
    averageUserCompilationDuration: number;

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

    @ApiProperty()
    @IsArray()
    characters: string[];

    @ApiProperty()
    @IsArray()
    areas: string[];

    @ApiProperty()
    @IsArray()
    packages: string[];

    @ApiProperty()
    @IsArray()
    items: string[];

    @ApiProperty({
        example: 'God of War is an action-adventure game...',
    })
    @IsString()
    gameBio: string;

    @ApiProperty()
    @IsArray()
    groups: string[];

    @ApiProperty()
    @IsArray()
    tags: string[];

    @ApiProperty({
        example: 'April 20, 2018',
    })
    @IsString()
    releaseDate: string;

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
