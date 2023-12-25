import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpcomingTitleDto {
  @IsBoolean()
  isUpcomingTitle: boolean;

  @IsDate()
  launchingDate: Date;

  @IsString()
  demoLink: string;
}
