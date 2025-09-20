export class ReadAuthorDTO {
  id: string;

  name: string;
  country: string;
  description: string | null;
  photo: string;
  dateOfBirth: Date;
  dateOfDeath: Date | null;

  albumsTotal: number;
}
