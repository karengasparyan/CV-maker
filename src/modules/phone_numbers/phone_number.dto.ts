import { IsString, IsNotEmpty } from 'class-validator';

export class phone_number {
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly phone_number: string;
}
