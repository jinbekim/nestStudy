import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
