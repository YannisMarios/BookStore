import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Book,
  BookFilterArgs,
  PaginatedResponse,
  PaginationArgs,
} from 'common';

export const bookApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    searchBooks: builder.query<
      PaginatedResponse<Book>,
      { filters: BookFilterArgs; pagination: PaginationArgs }
    >({
      query: ({
        filters: { searchTerm, filter },
        pagination: { pageNumber = 1, pageSize = 10 },
      }) =>
        searchTerm
          ? `books?searchTerm=${searchTerm}&filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}`
          : `books?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    viewBook: builder.query<Book, { id: string }>({
      query: ({ id }) => `books/${id}`,
    }),
  }),
});

export const { useSearchBooksQuery, useViewBookQuery } = bookApi;
