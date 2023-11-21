import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserInOtherResponsesDto } from '../../user/response/user-in-other-responses.dto';

export class PostListResponseDto {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty()
  title: string;
  @ApiProperty({
    type: UserInOtherResponsesDto,
  })
  @Expose()
  @Type(() => UserInOtherResponsesDto)
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
