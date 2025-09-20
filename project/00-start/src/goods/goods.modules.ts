import { Module } from '@nestjs/common';
import { GoodsServise } from './goods.servise';

@Module({
  providers: [GoodsServise],
  exports: [GoodsServise],
})
export class GoodsModule {}
