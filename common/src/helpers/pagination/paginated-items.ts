import { drop } from 'lodash';
import { PaginatedResponse } from './paginated-response';
import { PaginationArgs } from './pagination-args';

export const getPaginatedItems = <T>(
  data: T[],
  { pageNumber = 1, pageSize = 10 }: PaginationArgs
): PaginatedResponse<T> => {
  const offset = (pageNumber - 1) * pageSize;

  const pagedItems = drop(data, offset).slice(0, pageSize);

  return {
    pageNumber,
    pageSize,
    total: data.length,
    totalPages: Math.ceil(data.length / pageSize),
    items: pagedItems,
  };
};
