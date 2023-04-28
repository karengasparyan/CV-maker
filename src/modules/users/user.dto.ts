import {ApiProperty} from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail, IsArray, IsOptional, ValidateNested, Matches,
} from 'class-validator';
import {Type} from "class-transformer";
import { passwordValidation } from "src/utils/constanst";
import messages from 'src/utils/messages'

class socialsDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly url: string;
}
export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()  
  @Matches(passwordValidation, {
    message: messages.PASSWORD_VALIDATION_ERROR
  })
  readonly password: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => socialsDto)
  readonly socials: socialsDto[];
}

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UpdateDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly last_name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => socialsDto)
  readonly socials: socialsDto[];
}
export class updatePassword {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @IsString()  
  @Matches(passwordValidation, {
    message: messages.PASSWORD_VALIDATION_ERROR
  })
  readonly password: string;
}

export class forgotPassword {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
export class acceptCodeForgotPassword {
  @IsNotEmpty()
  @IsString()
  readonly code: string;
  
  @IsString()  
  @Matches(passwordValidation, {
    message: messages.PASSWORD_VALIDATION_ERROR
  })
  readonly password: string;
}