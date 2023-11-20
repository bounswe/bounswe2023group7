import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class DeleteCommentDto {
  @ApiProperty()
  @IsString()
  commentId: string;
}

