import { BookFilterEnum } from '../../enums';

export interface BookFilterArgs {
  searchTerm: string;
  filter: BookFilterEnum;
}
