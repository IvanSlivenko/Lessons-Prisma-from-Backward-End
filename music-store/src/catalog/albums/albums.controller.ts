import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import {
  CreateAlbumDTO,
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

  @Post()
  async create(@Body() data: CreateAlbumDTO): Promise<ReadAlbumDTO> {
    const id = await this.service.create(data);
    return this.service.getOne(id);
  }

  @Put(':albumId')
  async update(
    @Param() { albumId }: GetAlbumParams,
    @Body() data: CreateAlbumDTO,
  ): Promise<ReadAlbumDTO> {
    await this.service.update(albumId, data);
    return this.service.getOne(albumId);
  }

  @Delete(':albumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { albumId }: GetAlbumParams): Promise<void> {
    return this.service.delete(albumId);
  }
}
