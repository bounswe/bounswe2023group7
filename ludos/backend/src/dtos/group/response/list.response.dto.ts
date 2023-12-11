import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GameGetResponseDto } from '../../game/response/get.response';
import { UserInOtherResponsesDto } from '../../user/response/user-in-other-responses.dto';

export class GroupListResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: () => GameGetResponseDto })
  @Expose()
  @Type(() => GameGetResponseDto)
  game: GameGetResponseDto;

  @ApiProperty({ type: () => UserInOtherResponsesDto })
  @Expose()
  @Type(() => UserInOtherResponsesDto)
  admin: UserInOtherResponsesDto;

  @ApiProperty()
  @Expose()
  maxNumberOfMembers: number;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  tags: string[];

  @ApiProperty()
  @Expose()
  isJoined: boolean;
}
