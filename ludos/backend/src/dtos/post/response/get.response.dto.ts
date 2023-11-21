import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserInOtherResponsesDto } from '../../user/response/user-in-other-responses.dto';
import { GameGetResponseDto } from '../../game/response/get.response';

export class PostGetResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @Expose()
  @Type(() => GameGetResponseDto)
  @ApiProperty({ type: GameGetResponseDto })
  game: GameGetResponseDto;
  @Expose()
  @Type(() => UserInOtherResponsesDto)
  @ApiProperty({ type: UserInOtherResponsesDto })
  user: UserInOtherResponsesDto;
  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  media: string[];

  @ApiProperty()
  @Expose()
  tags: string[];

  @Expose()
  @ApiProperty()
  numberOfLikes: number;

  @Expose()
  @ApiProperty()
  numberOfDislikes: number;

  @Expose()
  @ApiProperty()
  isLiked: boolean;

  @Expose()
  @ApiProperty()
  isDisliked: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
