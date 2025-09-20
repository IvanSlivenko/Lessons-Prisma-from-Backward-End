import { Injectable, NotImplementedException, Param } from '@nestjs/common';
import {
  CreateAuthorDTO,
  GetAuthorParams,
  ReadAuthorDTO,
  ReadManyAuthorsDTO,
  ReadManyAuthorsQueryDTO,
} from './dto';

@Injectable()
export class AuthorsService {
  getMany(query: ReadManyAuthorsQueryDTO): Promise<ReadManyAuthorsDTO> {
    throw new NotImplementedException(
      `Method not implemented ${JSON.stringify(query)}`,
    );
  }

  getOne(authorId: string): Promise<ReadAuthorDTO> {
    throw new NotImplementedException(`Method not implemented ${authorId}`);
  }

  create(data: CreateAuthorDTO): Promise<string> {
    throw new NotImplementedException(
      `Method not implemented ${JSON.stringify(data)}`,
    );
  }

  update(authorId: string, data: CreateAuthorDTO): Promise<void> {
    console.log(data);
    throw new NotImplementedException(`Method not implemented ${authorId}`);
  }

  delete(authorId: string): Promise<void> {
    throw new NotImplementedException(`Method not implemented ${authorId}`);
  }
}
