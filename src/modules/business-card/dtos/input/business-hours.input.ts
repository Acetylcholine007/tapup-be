import { timeRangePattern } from '@common/utils/datetime.utils';
import { IsOptional, Matches } from 'class-validator';

export class BusinessHoursInput {
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  mon: string[];

  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  tue: string[];

  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  wed: string[];

  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  thu: string[];

  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  fri: string[];

  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  sat: string[];

  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  sun: string[];
}
