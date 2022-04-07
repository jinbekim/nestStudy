import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './boards/configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),AuthModule, BoardsModule],
})
export class AppModule {}
