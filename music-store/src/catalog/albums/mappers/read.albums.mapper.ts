import { Album, Author } from 'generated/prisma';
import { ReadAlbumDTO } from '../dto/read.album.dto';
import { ReadManyAlbumsDTO } from '../dto/read-many.albums.dto';

type AlbumWithAuthor = Album & { author: Author };

export class ReadAlbumsMapper {
  public mapOne(data: AlbumWithAuthor): ReadAlbumDTO {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      cover: data.cover,
      date: data.date,
      author: {
        id: data.author.id,
        name: data.author.name,
      },
    };
  }
  public mapMany(count: number, data: AlbumWithAuthor[]): ReadManyAlbumsDTO {
    return {
      count,
      data: data.map((one) => this.mapOne(one)),
    };
  }
}
