import { Author } from 'common';
import fakerStatic from 'faker';

export const authorsMockData = (): Author[] => {
  const authors: Author[] = [];

  for (let i = 0; i < 20; i++) {
    authors.push({
      id: fakerStatic.datatype.uuid(),
      name: `${fakerStatic.name.firstName()} ${fakerStatic.name.lastName()}`,
    });
  }

  return authors;
};
