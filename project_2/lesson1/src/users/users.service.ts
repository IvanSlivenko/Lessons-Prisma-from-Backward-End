import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users: Map<string, UserDTO> = new Map();

  getMany(): UserDTO[] {
    return [...this.users.values()];
  }

  create(data: CreateUserDTO): UserDTO {
    const user = {
      name: data.name,
      id: randomUUID(),
    };

    this.users.set(user.id, user);

    return user;
  }

  update(id: string, data: UpdateUserDTO): UserDTO {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.name = data.name;

    return user;
  }
}
