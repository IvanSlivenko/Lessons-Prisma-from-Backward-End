import { Module } from '@nestjs/common';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsService } from './authors/author.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class CatalogModule {}
