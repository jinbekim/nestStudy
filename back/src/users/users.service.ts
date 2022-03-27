import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    this.users.push(user);
    return user;
    // return 'This action adds a new user';
  }

  findAll() {
    // return `This action returns all users`;
    return this.users;
  }

  findById(id: string) {
    // return `This action returns a #${id} user`;
    return this.users.find((user) => user.id === id);
  }
  findByEmail(email: string) {
    // return `This action returns a #${id} user`;
    return this.users.find((user) => user.email === email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const user = this.users.find((user) => user.id === id);
    if (user) {
      updateUserDto.email ? (user.email = updateUserDto.email) : null;
      updateUserDto.password ? (user.password = updateUserDto.password) : null;
    }
    throw new HttpException('User not found', 404);
  }

  remove(id: string) {
    // return `This action removes a #${id} user`;
    this.users = this.users.filter((user) => user.id !== id);
  }
}
