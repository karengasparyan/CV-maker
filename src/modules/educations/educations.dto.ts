import {
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
export class educations {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  readonly start_date: string;

  @IsString()
  @IsDateString()
  readonly end_date: string;
}