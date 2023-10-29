import {ApiProperty} from '@nestjs/swagger';

export class GameCreateResponseDto {
    @ApiProperty()
    id: string; // You might want to use an appropriate data type for the game ID.

    @ApiProperty()
    title: string;

    @ApiProperty()
    coverLink: string;

    @ApiProperty()
    averageRating: number;

    @ApiProperty()
    userRating: number;

    @ApiProperty()
    followers: number;

    // You can include other properties from your game entity as needed.
}
