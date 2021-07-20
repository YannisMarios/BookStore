import { Category } from 'common';
import fakerStatic from 'faker';

/**
 * An array of categories mock data
 * @returns Array of Categories
 */
export const categoriesMockData: Category[] = [
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Arts & Photography',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Business & Money',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Comics & Graphic Novels',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Computers & Technology',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Cookbooks, Food & Wine',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Education & Teaching',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Engineering & Transportation',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'History',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Mystery, Thriller & Suspense',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Literature & Fiction',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Politics & Social Sciences',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Romance',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Science & Math',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Science Fiction & Fantasy',
  },
  {
    id: fakerStatic.datatype.uuid(),
    name: 'Travel',
  },
];
