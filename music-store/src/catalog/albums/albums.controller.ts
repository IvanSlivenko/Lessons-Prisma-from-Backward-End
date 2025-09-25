import { Controller, Get, Param, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import {
  GetAlbumParams,
  ReadAlbumDTO,
  ReadManyAlbumsDTO,
  ReadManyAlbumsQueryDTO,
} from './dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly service: AlbumsService) {}
  @Get()
  getMany(@Query() query: ReadManyAlbumsQueryDTO): Promise<ReadManyAlbumsDTO> {
    return this.service.getMany(query);
  }

  @Get(':albumId')
  getOne(@Param() { albumId }: GetAlbumParams): Promise<ReadAlbumDTO> {
    return this.service.getOne(albumId);
  }
}
