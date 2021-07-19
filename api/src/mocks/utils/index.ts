import { Author, Category } from 'common';
import fakerStatic from 'faker';
import { authorsMockData } from '../authors.mock';
import { categoriesMockData } from '../categories.mocks';
import { publishersMockData } from '../publishers.mocks';

const authors = authorsMockData();
const publishers = publishersMockData();

export const random10Digit = () =>
  Math.floor(1000000000 + Math.random() * 9000000000);

export const random13Digit = () =>
  Math.floor(1000000000000 + Math.random() * 9000000000000);

export const randomCategories = (): Category[] =>
  [
    ...Array(
      fakerStatic.datatype.number({
        min: 1,
        max: 3,
      })
    ),
  ].map(
    () =>
      categoriesMockData[
        fakerStatic.datatype.number({
          min: 1,
          max: categoriesMockData.length - 1,
        })
      ]
  );

export const randomAuthors = (): Author[] =>
  [
    ...Array(
      fakerStatic.datatype.number({
        min: 1,
        max: 3,
      })
    ),
  ].map(
    () =>
      authors[
        fakerStatic.datatype.number({
          min: 1,
          max: authors.length - 1,
        })
      ]
  );

export const randomPublisher = () =>
  publishers[fakerStatic.datatype.number(publishers.length - 1)];
