import {
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import {
  CreateAuthorDTO,
  ReadAuthorDTO,
  ReadManyAuthorsDTO,
  ReadManyAuthorsQueryDTO,
} from './dto';
import { PrismaService } from 'src/prisma';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany(query: ReadManyAuthorsQueryDTO): Promise<ReadManyAuthorsDTO> {
    const authors = await this.prisma.author.findMany({});
    if (!authors) {
      throw new NotFoundException('Authors not found');
    }

    return authors;
    // throw new NotImplementedException(
    //   `Method getMany not implemented ${JSON.stringify(query)}`,
    // );
  }

  async getOne(authorId: string): Promise<ReadAuthorDTO> {
    const author = await this.prisma.author.findFirst({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return {
      id: author.id,
      name: author.name,
      country: author.country,
      description: author.description,
      photo: author.photo,
      dateOfBirth: author.dateOfBirth,
      dateOfDeath: author.dateOfDeath,
      albumsTotal: 0, // TODO Map albums
    };
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
    console.log(data);
    throw new NotImplementedException(
      `Method update not implemented ${authorId}`,
    );
  }

  delete(authorId: string): Promise<void> {
    throw new NotImplementedException(
      `Method delete not implemented ${authorId}`,
    );
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
