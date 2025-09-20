import { IsUUID } from 'class-validator';

export class UserIdParamsDTO {
  @IsUUID(4)
  userId: string;
}
