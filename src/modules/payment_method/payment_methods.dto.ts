import { IsString, IsNotEmpty } from 'class-validator';

export class payment_method {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
