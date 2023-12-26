import { ApiProperty } from '@nestjs/swagger';
import { GameListResponseDto } from '../../game/response/list.response';
import { PostListResponseDto } from '../../post/response/list.response.dto';
import { UserInOtherResponsesDto } from '../../user/response/user-in-other-responses.dto';
import { Expose, Type } from 'class-transformer';
import { GroupListResponseDto } from '../../group/response/list.response.dto';

export class SearchResponseDto {
  @ApiProperty({ type: () => [UserInOtherResponsesDto] })
  @Type(() => UserInOtherResponsesDto)
  @Expose()
  users: UserInOtherResponsesDto[];
  @ApiProperty({ type: () => [GameListResponseDto] })
  @Type(() => GameListResponseDto)
  @Expose()
  games: GameListResponseDto[];
  @ApiProperty({ type: () => [PostListResponseDto] })
  @Type(() => PostListResponseDto)
  @Expose()
  posts: PostListResponseDto[];
  @ApiProperty({ type: () => [GroupListResponseDto] })
  @Type(() => GroupListResponseDto)
  @Expose()
  groups: GroupListResponseDto[];
}
