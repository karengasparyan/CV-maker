import {ApiProperty} from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
export class language {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly language: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly level: string;

}