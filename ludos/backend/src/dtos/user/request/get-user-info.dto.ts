import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserInfoDto {
    @ApiProperty({
        example: '1',
    })
    @IsString()
    id: string;
}
