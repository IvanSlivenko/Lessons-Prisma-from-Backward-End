import { Author } from 'generated/prisma';
import { ReadAuthorDTO, ReadManyAuthorsDTO } from '../dto';

export class ReadAuthorsMapper {
  public mapOne(author: Author): ReadAuthorDTO {
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
  public mapMany(count: number, data: Author[]): ReadManyAuthorsDTO {
    return {
      count,
      data: data.map((one) => this.mapOne(one)),
    };
  }
}
