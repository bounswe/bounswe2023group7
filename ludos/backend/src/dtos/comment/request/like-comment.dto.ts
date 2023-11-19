import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class LikeCommentDto {
  @ApiProperty()
  @IsString()
  commentId: string;
}

