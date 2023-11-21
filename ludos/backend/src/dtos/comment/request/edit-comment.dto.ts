import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class EditCommentDto {
  @ApiProperty()
  @IsString()
  newText: string;
}

