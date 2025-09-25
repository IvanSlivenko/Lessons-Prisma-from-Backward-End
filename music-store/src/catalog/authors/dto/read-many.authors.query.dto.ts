import { IsOptional, Length } from 'class-validator';
import { ReadManyQueryDTO } from 'src/common';

export class ReadManyAuthorsQueryDTO extends ReadManyQueryDTO {
  @IsOptional()
  @Length(1, 50)
  search: string | undefined | null;
}
