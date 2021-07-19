import { Publisher } from 'common';
import fakerStatic from 'faker';

export const publishersMockData = (): Publisher[] => {
  const publishers: Publisher[] = [];

  for (let i = 0; i < 20; i++) {
    publishers.push({
      id: fakerStatic.datatype.uuid(),
      name: fakerStatic.company.companyName(),
    });
  }

  return publishers;
};
