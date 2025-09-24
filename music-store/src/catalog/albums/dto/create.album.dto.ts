import { IsDate, IsOptional, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateAlbumDTO {
  @IsUUID(4)
  authorId: string;

  @Length(2, 250)
  name: string;

  @IsOptional()
  @Length(2, 1000)
  description: string | undefined | null;

  @IsUrl({ protocols: ['https'] })
  cover: string;

  @IsDate()
  date: Date;
}
