import { Module } from '@nestjs/common';
import { UsersServise } from './users.servise';

@Module({
  providers: [UsersServise],
  exports: [UsersServise],
})
export class UseresModule {}
