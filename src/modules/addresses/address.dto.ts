import {ApiProperty} from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsObject, IsInt, Min, Max, IsEmail, IsArray, IsOptional, isEmail, ValidateNested
} from 'class-validator';
import {Type} from "class-transformer";
export class address {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly zip: string;

}