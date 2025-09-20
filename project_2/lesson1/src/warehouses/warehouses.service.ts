import { WarehousesDTO } from './dto/warehouses.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateWarehousesDTO } from './dto/create-warehouses.dto';
import { UpdateWarehousesDTO } from './dto/update-warehouses.dto';

@Injectable()
export class WarehousesService {
  private warehouses: Map<string, WarehousesDTO> = new Map();

  getMany(): WarehousesDTO[] {
    return [...this.warehouses.values()];
  }

  create(data: CreateWarehousesDTO): WarehousesDTO {
    const warehouse = {
      name: data.name,
      id: randomUUID(),
    };

    this.warehouses.set(warehouse.id, warehouse);

    return warehouse;
  }

  update(id: string, data: UpdateWarehousesDTO): WarehousesDTO {
    const warehouse = this.warehouses.get(id);
    if (!warehouse) {
      throw new NotFoundException('Warehous not found');
    }
    warehouse.name = data.name;

    return warehouse;
  }
}
