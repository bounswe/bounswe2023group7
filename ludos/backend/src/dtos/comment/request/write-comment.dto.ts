import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class WriteCommentDto {
  @ApiProperty()
  @IsString()
  parentId: string;

  @ApiProperty()
  @IsString()
  text: string;
}

