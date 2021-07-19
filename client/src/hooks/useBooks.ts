import { searchBooksAction } from '@/store/book/actions';
import {
  bookSelector,
  isFetchingSelector,
  pageSelector,
} from '@/store/book/selectors';
import { AppDispatch } from '@/store/configureStore';
import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isFetching = useSelector(isFetchingSelector);
  const page = useSelector(pageSelector);
  const book = useSelector(bookSelector);

  const searchBooks = useCallback(
    (arg: { searchTerm?: string; pageNumber: number; pageSize: number }) => {
      return dispatch(
        searchBooksAction({
          searchTerm: arg.searchTerm,
          pageNumber: arg.pageNumber,
          pageSize: arg.pageSize,
        })
      ).then(unwrapResult);
    },
    [dispatch]
  );

  return {
    isFetching,
    page,
    book,
    searchBooks,
  };
};
