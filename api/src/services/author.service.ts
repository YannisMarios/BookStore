import { Author } from 'common';
import { authorsMockData } from '../mocks/authors.mock';

/**
 * The Author singleton service
 */
export class AuthorService {
  private readonly authors: Author[];
  static instance: AuthorService;

  private constructor() {
    this.authors = authorsMockData();
  }

  public static getInstance(): AuthorService {
    if (!AuthorService.instance) {
      AuthorService.instance = new AuthorService();
    }
    return AuthorService.instance;
  }

  public getAuthors(): Author[] {
    return this.authors;
  }

  public getAuthor(id: string): Author | undefined {
    return this.authors.find((x) => x.id === id);
  }

  public searchAuthor(term: string): Author[] {
    return this.authors.filter((author) => author.name.includes(term));
  }
}
