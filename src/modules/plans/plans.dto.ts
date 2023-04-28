import {
  IsString,
  IsNotEmpty,
  IsOptional, IsBoolean, IsNumber
} from 'class-validator';
export class plan {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly number: number;

  @IsOptional()
  @IsBoolean()
  readonly disabled: boolean;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

}
export class planSubscribeToggle {
  @IsNotEmpty()
  @IsBoolean()
  readonly cancel_at: boolean;


}