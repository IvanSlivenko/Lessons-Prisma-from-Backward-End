import { Module } from '@nestjs/common';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsService } from './authors/authors.service';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';

@Module({
  controllers: [AuthorsController, AlbumsController],
  providers: [AuthorsService, AlbumsService],
})
export class CatalogModule {}
