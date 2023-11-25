import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../../../entities/game.entity';
import { UserType } from '../../../enums/user-type.enum';
import { Rating } from 'entities/rating.entity';

export class GetUserInfoResponseDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  followedGames: Game[];
  @ApiProperty()
  ratingList: Rating[];
  @ApiProperty()
  isNotificationEnabled: boolean;
  @ApiProperty({
    enum: UserType,
  })
  userType: UserType;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  aboutMe: string;
  @ApiProperty()
  steamUrl: string;
}
