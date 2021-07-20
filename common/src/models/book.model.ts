import { Author } from './author.model';
import { Category } from './category.model';
import { Publisher } from './publisher.model';

export interface Book {
  id?: string;
  title: string;
  authors: Author[];
  publisher: Publisher;
  pages: number;
  description: string;
  categories: Category[];
  rating: number;
  year: number;
  image: string;
  isbn10: string;
  isbn13: string;
}
