import {
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

  getMany(query: ReadManyAuthorsQueryDTO): Promise<ReadManyAuthorsDTO> {
    throw new NotImplementedException(
      `Method getMany not implemented ${JSON.stringify(query)}`,
    );
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
    const { id } = await this.prisma.author.create({
      data: { ...data, id: randomUUID() },
    });
    return id;
  }

  update(authorId: string, data: CreateAuthorDTO): Promise<void> {
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
}
