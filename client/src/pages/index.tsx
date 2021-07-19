import { BookListItem } from '@/components/book';
import { Search } from '@/components/search';
import { SpacingPaper } from '@/components/shared';
import { Page } from '@/components/shared/Page';
import { useSearchBooksQuery } from '@/store/book';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  makeStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { Book, BookFilterEnum, enumValues } from 'common';
import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { ChangeEvent, Fragment, useState } from 'react';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '2rem',
  },
  gridItem: {
    margin: 'auto',
  },
  pagination: {
    marginTop: '2rem',
  },
});

const IndexPage: NextPage = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<BookFilterEnum>(BookFilterEnum.TITLE);
  const [page, setPage] = React.useState(1);

  const { data, isFetching } = useSearchBooksQuery({
    filters: { searchTerm, filter },
    pagination: { pageNumber: page, pageSize: 12 },
  });

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value as BookFilterEnum);
  };

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Fragment>
      <Head>
        <title>Search for books</title>
      </Head>
      <Page>
        <Page.Content>
          <Box m={4}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <Link color="inherit" href="/">
                Search
              </Link>
            </Breadcrumbs>
          </Box>
          <Box display="flex" mt={2} pr={4} justifyContent="flex-end">
            <NextLink href="/book/add" passHref>
              <Button variant="contained" color="primary">
                Add Book
              </Button>
            </NextLink>
          </Box>
          <SpacingPaper>
            <Grid container justifyContent="center">
              <Typography gutterBottom variant="h4" align="center">
                Search to find your new book
              </Typography>
            </Grid>
            <Grid container justifyContent="center">
              <Search
                searchTerm={searchTerm}
                onSearchTermChange={onSearchTermChange}
                filters={enumValues(BookFilterEnum)}
                selectedFilter={filter}
                onFilterChange={onFilterChange}
              />
              {isFetching ? (
                <CircularProgress />
              ) : (
                <div className={classes.root}>
                  <Grid container spacing={2}>
                    {data?.items
                      ? data.items.map((book: Book) => (
                          <Grid
                            item
                            key={book.id}
                            xs={12}
                            md={6}
                            lg={3}
                            className={classes.gridItem}
                          >
                            <BookListItem book={book} />
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </div>
              )}
            </Grid>
            <Grid
              container
              justifyContent="center"
              className={classes.pagination}
            >
              <Pagination
                count={data?.totalPages || 0}
                page={page}
                onChange={onPageChange}
                variant="outlined"
                color="secondary"
              />
            </Grid>
          </SpacingPaper>
        </Page.Content>
      </Page>
    </Fragment>
  );
};

export default IndexPage;
