import {IsString, IsEmail} from "class-validator";
export class RegisterDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}