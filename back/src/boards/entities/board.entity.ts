import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  title: string;

  description: string;

  //relation
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
