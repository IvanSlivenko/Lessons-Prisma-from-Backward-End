export class ReadAlbumAuthorDTO {
  id: string;
  name: string;
}

export class ReadAlbumDTO {
  id: string;
  name: string;
  description: string | null;
  cover: string;
  date: Date;
  author: ReadAlbumAuthorDTO;
}
