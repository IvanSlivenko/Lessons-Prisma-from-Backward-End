import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [UsersModule, WarehousesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
