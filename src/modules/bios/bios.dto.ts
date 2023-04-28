import {ApiProperty} from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
export class bio {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly bio: string;
}