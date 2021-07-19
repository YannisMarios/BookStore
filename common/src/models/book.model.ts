import { Author } from './author.model';
import { Category } from './category.model';
import { Publisher } from './publisher.model';

export interface Book {
  id?: string;
  title: string;
  subtitle: string;
  authors: Author[];
  published: Date;
  publisher: Publisher;
  pages: number;
  description: string;
  website: string;
  categories: Category[];
  rating: number;
  image: string;
  isbn10: string;
  isbn13: string;
}
