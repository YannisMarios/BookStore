import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Author,
  Book,
  BookFilterArgs,
  Category,
  PaginatedResponse,
  PaginationArgs,
  Publisher,
} from 'common';

export const api = createApi({
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
    getAuthors: builder.query<Author[], string>({
      query: () => 'authors',
    }),
    getCategories: builder.query<Category[], string>({
      query: () => 'categories',
    }),
    getPublishers: builder.query<Publisher[], string>({
      query: () => 'publishers',
    }),
  }),
});

export const {
  useSearchBooksQuery,
  useViewBookQuery,
  useGetAuthorsQuery,
  useGetCategoriesQuery,
  useGetPublishersQuery,
} = api;
