import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Author } from 'common';

export const authorApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getAuthors: builder.query<Author[], string>({
      query: () => 'authors',
    }),
  }),
});

export const { useGetAuthorsQuery } = authorApi;
