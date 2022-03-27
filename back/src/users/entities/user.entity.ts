import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  constructor(user: CreateUserDto) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
  }

  id: string;
  email: string;
  password: string;
}
