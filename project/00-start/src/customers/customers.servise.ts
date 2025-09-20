import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersServise {
  getCustomer(): string {
    return 'No customers found';
  }
}
