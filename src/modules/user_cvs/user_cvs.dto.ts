import {
  IsDate,
  IsOptional,
} from 'class-validator';
import {Transform} from "class-transformer";

export class inMath {
  @IsOptional()
  @Transform( ({ value }) => value && new Date(value))
  @IsDate()
  readonly start?: string;

  @IsOptional()
  @Transform( ({ value }) => value && new Date(value))
  @IsDate()
  readonly end?: string;
}