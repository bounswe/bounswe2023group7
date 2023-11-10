import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../../../entities/game.entity';

export class GetUserInfoResponseDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    followedGames: Game[];
}
