import {ApiProperty} from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
export class skill {
  @IsString()
  @IsNotEmpty()
  readonly skill: string;

}