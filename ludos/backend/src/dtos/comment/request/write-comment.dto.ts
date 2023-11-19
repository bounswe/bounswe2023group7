import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class WriteCommentDto {
  @ApiProperty()
  @IsString()
  postId: string;

  @ApiProperty()
  @IsString()
  text: string;
}

