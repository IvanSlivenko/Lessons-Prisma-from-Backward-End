import { IsUUID } from 'class-validator';

export class GetAlbumParams {
  @IsUUID(4)
  albumId: string;
}
