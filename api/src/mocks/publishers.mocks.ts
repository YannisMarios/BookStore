import { Publisher } from 'common';
import fakerStatic from 'faker';

/**
 * Utility function to generate publishers mock data
 * @returns Array of Publishers
 */
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
