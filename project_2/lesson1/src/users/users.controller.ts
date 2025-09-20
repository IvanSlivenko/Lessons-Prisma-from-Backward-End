import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserIdParamsDTO } from './dto/user-id.params.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDTO): UserDTO {
    return this.service.create(data);
  }

  @Put(':userId')
  update(
    @Param() { userId }: UserIdParamsDTO,
    @Body() data: UpdateUserDTO,
  ): UserDTO {
    return this.service.update(userId, data);
  }

  @Get()
  getMany(): UserDTO[] {
    return this.service.getMany();
  }
}
