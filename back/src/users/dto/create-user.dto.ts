import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
