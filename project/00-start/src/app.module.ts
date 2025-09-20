import { UseresModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { GoodsModule } from './goods/goods.modules';

@Module({
  imports: [UseresModule, CustomersModule, GoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
