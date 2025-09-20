import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehousesDTO } from './dto/create-warehouses.dto';
import { WarehousesDTO } from './dto/warehouses.dto';
import { WarehousIdParamsDTO } from './dto/warehouses-id.params.dto';
import { UpdateWarehousesDTO } from './dto/update-warehouses.dto';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly service: WarehousesService) {}

  @Post()
  create(@Body() data: CreateWarehousesDTO): WarehousesDTO {
    return this.service.create(data);
  }

  @Put(':warehousId')
  update(
    @Param() { warehousId }: WarehousIdParamsDTO,
    @Body() data: UpdateWarehousesDTO,
  ): WarehousesDTO {
    return this.service.update(warehousId, data);
  }

  @Get()
  getMany(): WarehousesDTO[] {
    return this.service.getMany();
  }
}
