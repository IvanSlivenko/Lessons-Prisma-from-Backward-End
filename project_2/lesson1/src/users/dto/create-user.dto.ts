import { IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(2, 32)
  name: string;
}
