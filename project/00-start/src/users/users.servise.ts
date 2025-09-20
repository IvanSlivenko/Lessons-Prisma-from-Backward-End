import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersServise {
  getUser(): string {
    return 'No users found';
  }
}
