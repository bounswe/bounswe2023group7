import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
export class EditUserInfoDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isNotificationEnabled: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  aboutMe: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  steamUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  associatedTeam: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  associatedCompany: string;
}
