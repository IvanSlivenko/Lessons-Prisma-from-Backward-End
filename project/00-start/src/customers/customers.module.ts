import { Module } from '@nestjs/common';
import { CustomersServise } from './customers.servise';


@Module({
  providers: [CustomersServise],
  exports: [CustomersServise],
})
export class CustomersModule {}