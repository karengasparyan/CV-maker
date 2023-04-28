import {
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
export class certificates {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  readonly expaire_date: string;
}