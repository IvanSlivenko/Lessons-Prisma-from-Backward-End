import { Prisma } from 'generated/prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReadAlbumsMapper } from './mappers';
import { PrismaService } from 'src/prisma';
import { ReadManyAlbumsQueryDTO } from './dto/read-many.albums.query.dto';
import { CreateAlbumDTO, ReadAlbumDTO, ReadManyAlbumsDTO } from './dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumsService {
  private readonly mapper = new ReadAlbumsMapper();

  constructor(private readonly prisma: PrismaService) {}

  async getMany(query: ReadManyAlbumsQueryDTO): Promise<ReadManyAlbumsDTO> {
    const name: Prisma.StringFilter | undefined = query.search
      ? { contains: query.search, mode: 'insensitive' }
      : undefined;

    const count = await this.prisma.album.count({ where: { name } });

    const data = await this.prisma.album.findMany({
      take: query.take,
      skip: query.skip,
      where: { name },
      include: { author: true },
      orderBy: { name: 'asc' },
    });
    return this.mapper.mapMany(count, data);
  }

  async getOne(albumId: string): Promise<ReadAlbumDTO> {
    const album = await this.prisma.album.findFirst({
      where: { id: albumId },
      include: { author: true },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.mapper.mapOne(album);
  }

  async create(data: CreateAlbumDTO): Promise<string> {
    await this.checkAuthor(data.authorId);
    await this.checkName(data.name);

    const { id } = await this.prisma.album.create({
      data: { ...data, id: randomUUID() },
    });

    return id;
  }

  async update(albumId: string, data: CreateAlbumDTO): Promise<void> {
    await this.checkName(data.name);
    await this.prisma.author.update({
      where: { id: albumId },
      data,
    });
  }

  async delete(albumId: string): Promise<void> {
    await this.prisma.author.delete({ where: { id: albumId } });
  }

  private async checkName(name: string, albumId?: string): Promise<void> {
    const id = albumId ? { not: albumId } : undefined;
    const existingOne = await this.prisma.album.findFirst({
      where: { name: { equals: name, mode: 'insensitive' }, id },
    });
    if (existingOne) {
      // 409
      throw new ConflictException(`Album ${name} already exist`);
    }
  }

  private async checkAuthor(authorId: string): Promise<void> {
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }
  }
}
