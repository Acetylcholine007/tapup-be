import { timeRangePattern } from '@common/utils/datetime.utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';

export class BusinessHoursInput {
  @ApiProperty()
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  mon: string[];

  @ApiProperty()
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  tue: string[];

  @ApiProperty()
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  wed: string[];

  @ApiProperty()
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  thu: string[];

  @ApiProperty()
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  fri: string[];

  @ApiProperty()
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  sat: string[];

  @ApiProperty()
  @IsOptional()
  @Matches(timeRangePattern, { each: true })
  sun: string[];
}
