import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class DislikeCommentDto {
  @ApiProperty()
  @IsString()
  commentId: string;
}

