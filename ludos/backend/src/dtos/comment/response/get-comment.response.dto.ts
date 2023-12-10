import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../entities/user.entity';
import { IsDate, IsBoolean, IsString, IsNumber } from 'class-validator';

export class GetCommentResponseDto {
  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty()
  @IsDate()
  timestamp: Date;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  parentId: string;

  @ApiProperty()
  @IsBoolean()
  edited: boolean;

  @ApiProperty()
  @IsNumber()
  likeCount: number;

  @ApiProperty()
  @IsNumber()
  dislikeCount: number;

  @ApiProperty()
  @IsBoolean()
  isLiked: boolean;

  @ApiProperty()
  @IsBoolean()
  isDisLiked: boolean;
}
