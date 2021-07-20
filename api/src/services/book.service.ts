import {
  Author,
  Book,
  BookFilterArgs,
  BookFilterEnum,
  getPaginatedItems,
  PaginatedResponse,
  PaginationArgs,
} from 'common';
import fakerStatic from 'faker';
import { booksMockData } from '../mocks/books.mock';

/**
 * The Book singleton service
 */
export class BookService {
  private readonly books: Book[];
  static instance: BookService;

  private constructor() {
    this.books = booksMockData();
  }

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService();
    }
    return BookService.instance;
  }

  public searchBooksPaginated(
    { searchTerm, filter }: BookFilterArgs,
    { pageNumber = 1, pageSize = 10 }: PaginationArgs
  ): PaginatedResponse<Book> {
    let filteredItems = [...this.books];

    if (searchTerm) {
      switch (filter) {
        case BookFilterEnum.TITLE:
          filteredItems = filteredItems.filter((book: Book) =>
            book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
          );
          break;
        case BookFilterEnum.ISBN:
          filteredItems = filteredItems.filter(
            (book: Book) =>
              book.isbn10 === searchTerm.trim() ||
              book.isbn13 === searchTerm.trim()
          );
          break;
        case BookFilterEnum.AUTHOR:
          filteredItems = filteredItems.filter((book: Book) => {
            if (
              book.authors.filter((author: Author) =>
                author.name
                  .toLowerCase()
                  .includes(searchTerm.trim().toLowerCase())
              ).length > 0
            ) {
              return book;
            }
          });
          break;
        case BookFilterEnum.PUBLISHED:
          filteredItems = filteredItems.filter(
            (book: Book) => book.year === +searchTerm.trim()
          );
          break;
        case BookFilterEnum.PUBLISHER:
          filteredItems = filteredItems.filter((book: Book) =>
            book.publisher.name
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase())
          );
          break;
        case BookFilterEnum.PAGES:
          filteredItems = filteredItems.filter(
            (book: Book) => book.pages >= +searchTerm.trim()
          );
          break;
        case BookFilterEnum.DESCRIPTION:
          filteredItems = filteredItems.filter((book: Book) =>
            book.description
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase())
          );
          break;
        case BookFilterEnum.CATEGORY:
          filteredItems = filteredItems.filter((book: Book) => {
            if (
              book.categories.filter((category: Author) =>
                category.name
                  .toLowerCase()
                  .includes(searchTerm.trim().toLowerCase())
              ).length > 0
            ) {
              return book;
            }
          });
          break;
        case BookFilterEnum.RATING:
          filteredItems = filteredItems.filter(
            (book: Book) => book.rating >= +searchTerm.trim()
          );
          break;
      }
    }

    return getPaginatedItems(filteredItems, { pageNumber, pageSize });
  }

  public addBook(book: Book): string {
    book.id = fakerStatic.datatype.uuid();
    book.authors = book.authors.map((author: Author) => ({
      id: fakerStatic.datatype.uuid(),
      name: author.name,
    }));
    book.image = 'https://source.unsplash.com/random/250x300';
    this.books.push(book);

    return book.title;
  }

  public getBook(id: string): Book | undefined {
    return this.books.find((x) => x.id === id);
  }

  public searchBook(term: string): Book[] {
    return this.books.filter((book) =>
      Object.values(book).some((val) => val.includes(term))
    );
  }
}
