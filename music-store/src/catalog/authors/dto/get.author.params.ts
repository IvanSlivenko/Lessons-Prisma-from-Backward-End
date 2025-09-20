import { IsUUID } from 'class-validator';

export class GetAuthorParams {
  @IsUUID(4)
  authorId: string;
}
