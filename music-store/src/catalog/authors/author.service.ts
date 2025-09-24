import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAuthorDTO,
  ReadAuthorDTO,
  ReadManyAuthorsDTO,
  ReadManyAuthorsQueryDTO,
} from './dto';
import { PrismaService } from 'src/prisma';
import { randomUUID } from 'crypto';
import { Prisma } from 'generated/prisma';
import { ReadAuthorsMapper } from './mappers';

@Injectable()
export class AuthorsService {
  private readonly mapper = new ReadAuthorsMapper();

  constructor(private readonly prisma: PrismaService) {}

  async getMany(query: ReadManyAuthorsQueryDTO): Promise<ReadManyAuthorsDTO> {
    const name: Prisma.StringFilter | undefined = query.search
      ? { contains: query.search, mode: 'insensitive' }
      : undefined;

    const count = await this.prisma.author.count({
      where: { name },
    });
    const data = await this.prisma.author.findMany({
      take: query.take,
      skip: query.skip,
      where: {
        name,
      },
    });
    if (data.length === 0) {
      throw new NotFoundException('Authors not found');
    }
    return this.mapper.mapMany(count, data);
  }

  async getOne(authorId: string): Promise<ReadAuthorDTO> {
    const author = await this.prisma.author.findFirst({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.mapper.mapOne(author);
  }

  async create(data: CreateAuthorDTO): Promise<string> {
    await this.checkName(data.name);
    const { id } = await this.prisma.author.create({
      data: { ...data, id: randomUUID() },
    });
    return id;
  }

  async update(authorId: string, data: CreateAuthorDTO): Promise<void> {
    await this.checkName(data.name, authorId);
    await this.prisma.author.update({
      where: { id: authorId },
      data,
    });
  }

  async delete(authorId: string): Promise<void> {
    await this.prisma.author.delete({ where: { id: authorId } });
  }

  private async checkName(name: string, authorId?: string): Promise<void> {
    const id = authorId ? { not: authorId } : undefined;
    const existingOne = await this.prisma.author.findFirst({
      where: { name: { equals: name, mode: 'insensitive' }, id },
    });
    if (existingOne) {
      // 409
      throw new ConflictException(`Author ${name} alread exist`);
    }
  }
}
