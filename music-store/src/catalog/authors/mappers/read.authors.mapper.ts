import { Author } from 'generated/prisma';
import { ReadAuthorDTO, ReadManyAuthorsDTO } from '../dto';

type AuthorData = Author & {
  _count: {
    Album: number;
  };
};

export class ReadAuthorsMapper {
  public mapOne(author: AuthorData): ReadAuthorDTO {
    return {
      id: author.id,
      name: author.name,
      country: author.country,
      description: author.description,
      photo: author.photo,
      dateOfBirth: author.dateOfBirth,
      dateOfDeath: author.dateOfDeath,
      albumsTotal: author._count.Album, // TODO Map albums
    };
  }
  public mapMany(count: number, data: AuthorData[]): ReadManyAuthorsDTO {
    return {
      count,
      data: data.map((one) => this.mapOne(one)),
    };
  }
}
