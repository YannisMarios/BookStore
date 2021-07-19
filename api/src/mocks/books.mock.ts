import { Book } from 'common';
import fakerStatic from 'faker';
import {
  random10Digit,
  random13Digit,
  randomAuthors,
  randomCategories,
  randomPublisher,
} from './utils';

export const booksMockData = (): Book[] => {
  const books: Book[] = [];

  for (let i = 0; i < 200; i++) {
    books.push({
      id: fakerStatic.datatype.uuid(),
      title: fakerStatic.lorem.words(
        fakerStatic.datatype.number({ min: 1, max: 3 })
      ),
      subtitle: fakerStatic.lorem.words(
        fakerStatic.datatype.number({ min: 2, max: 8 })
      ),
      authors: randomAuthors(),
      published: fakerStatic.date.past(30),
      publisher: randomPublisher(),
      pages: fakerStatic.datatype.number(9999),
      description: fakerStatic.lorem.words(
        fakerStatic.datatype.number(
          fakerStatic.datatype.number({ min: 20, max: 30 })
        )
      ),
      website: fakerStatic.internet.url(),
      categories: randomCategories(),
      rating: fakerStatic.datatype.float({
        min: 1,
        max: 5,
        precision: 0.1,
      }),
      image: 'https://source.unsplash.com/random/250x300',
      isbn10: random10Digit().toString(),
      isbn13: random13Digit().toString(),
    });
  }

  return books;
};
