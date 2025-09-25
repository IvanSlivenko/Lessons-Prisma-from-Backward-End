import { Module } from '@nestjs/common';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsService } from './authors/authors.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class CatalogModule {}
