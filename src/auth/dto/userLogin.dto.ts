// user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class userLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  readonly userPassword: string;
}
