import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponseDto {
  @ApiProperty()
  isSuccess: boolean;
  constructor(isSuccess: boolean) {
    this.isSuccess = isSuccess;
  }
}
