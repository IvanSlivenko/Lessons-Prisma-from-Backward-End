import { Injectable } from '@nestjs/common';

@Injectable()
export class GoodsServise {
  getGoot(): string {
    return 'No goods found';
  }
}
