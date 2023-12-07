import { ApiProperty } from '@nestjs/swagger';

export class ReviewGetInfoResponseDto {
  @ApiProperty()
  reviewId: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  gameId: string;

  @ApiProperty()
  likedUserCount: number;

  @ApiProperty()
  dislikedUserCount: number;

  @ApiProperty()
  isBelongToUser: boolean;

  @ApiProperty()
  isLikedByUser: boolean;

  @ApiProperty()
  isDislikedByUser: boolean;
}
