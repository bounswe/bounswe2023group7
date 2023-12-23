import { ApiProperty } from "@nestjs/swagger";
import {Expose, Type} from "class-transformer";
import { CreateAnnotationDto } from "../request/create.dto";
export class AnnotationResponseDto extends CreateAnnotationDto{
  @ApiProperty()
  @Expose()
  id: string;
}