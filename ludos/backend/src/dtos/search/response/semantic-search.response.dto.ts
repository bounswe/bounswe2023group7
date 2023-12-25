import { ApiProperty } from '@nestjs/swagger';
import { GameListResponseDto } from '../../game/response/list.response';
import { PostListResponseDto } from '../../post/response/list.response.dto';
import { UserInOtherResponsesDto } from '../../user/response/user-in-other-responses.dto';
import { Expose, Type } from 'class-transformer';
import { GroupListResponseDto } from '../../group/response/list.response.dto';
export class UserSemanticResponseDto {
  @ApiProperty({ type: () => UserInOtherResponsesDto })
  @Expose()
  @Type(() => UserInOtherResponsesDto)
  item: UserInOtherResponsesDto;

  @ApiProperty()
  @Expose()
  score: number;
}
export class GameSemanticResponseDto {
  @ApiProperty({ type: () => GameListResponseDto })
  @Expose()
  @Type(() => GameListResponseDto)
  item: GameListResponseDto;

  @ApiProperty()
  @Expose()
  score: number;
}
export class PostSemanticResponseDto {
  @ApiProperty({ type: () => PostListResponseDto })
  @Expose()
  @Type(() => PostListResponseDto)
  item: PostListResponseDto;

  @ApiProperty()
  @Expose()
  score: number;
}
export class GroupSemanticResponseDto {
  @ApiProperty({ type: () => GroupListResponseDto })
  @Expose()
  @Type(() => GroupListResponseDto)
  item: GroupListResponseDto;

  @ApiProperty()
  @Expose()
  score: number;
}
export class SemanticSearchResponseDto {
  @ApiProperty({ type: () => [UserSemanticResponseDto] })
  @Type(() => UserSemanticResponseDto)
  @Expose()
  users: UserSemanticResponseDto[];
  @ApiProperty({ type: () => [GameSemanticResponseDto] })
  @Type(() => GameSemanticResponseDto)
  @Expose()
  games: GameSemanticResponseDto[];
  @ApiProperty({ type: () => [PostSemanticResponseDto] })
  @Type(() => PostSemanticResponseDto)
  @Expose()
  posts: PostSemanticResponseDto[];
  @ApiProperty({ type: () => [GroupSemanticResponseDto] })
  @Type(() => GroupSemanticResponseDto)
  @Expose()
  groups: GroupSemanticResponseDto[];
}
