import { Injectable, NotImplementedException } from '@nestjs/common';
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

  getOne(authorId: string): Promise<ReadAuthorDTO> {
    throw new NotImplementedException(
      `Method getOne not implemented ${authorId}`,
    );
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
