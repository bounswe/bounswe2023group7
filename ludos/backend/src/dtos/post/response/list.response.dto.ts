import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserInOtherResponsesDto } from '../../user/response/user-in-other-responses.dto';
import { GameGetResponseDto } from '../../game/response/get.response';
import { GroupGetResponseDto } from '../../group/response/get.response.dto';

export class PostListResponseDto {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty()
  title: string;
  @Expose()
  @Type(() => GameGetResponseDto)
  @ApiProperty({ type: GameGetResponseDto })
  game: GameGetResponseDto;

  @Expose()
  @Type(() => GroupGetResponseDto)
  @ApiProperty({ type: GroupGetResponseDto })
  group: GroupGetResponseDto;

  @Expose()
  @Type(() => UserInOtherResponsesDto)
  @ApiProperty({ type: UserInOtherResponsesDto })
  user: UserInOtherResponsesDto;
  @Expose()
  @ApiProperty()
  body: string;
  @Expose()
  @ApiProperty()
  media: string[];
  @Expose()
  @ApiProperty()
  numberOfLikes: number;
  @Expose()
  @ApiProperty()
  numberOfDislikes: number;
  @Expose()
  @ApiProperty()
  tags: string[];
  @Expose()
  @ApiProperty()
  createdAt: Date;
  @Expose()
  @ApiProperty()
  isLiked: boolean;
  @Expose()
  @ApiProperty()
  isDisliked: boolean;
}
