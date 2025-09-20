import { UsersServise } from './users/users.servise';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomersServise } from './customers/customers.servise';
import { GoodsServise } from './goods/goods.servise';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersServise,
    private readonly customerService: CustomersServise,
    private readonly goodsService: GoodsServise,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): string {
    return this.userService.getUser();
  }

  @Get('customers')
  getCustomers(): string {
    return this.customerService.getCustomer();
  }

  @Get('goods')
  getGoods(): string {
    return this.goodsService.getGoot();
  }
}
