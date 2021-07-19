import { BookViewCard } from '@/components/book';
import BookSlider from '@/components/book/BookSlider/BookSlider';
import { BookViewDetails } from '@/components/book/BookViewDetails';
import { Page, SpacingPaper } from '@/components/shared';
import { useViewBookQuery } from '@/store/api';
import {
  Box,
  Breadcrumbs,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

type Props = {
  id: string;
};

const BookShowPage = ({ id }: Props) => {
  const classes = useStyles();
  const { data, isFetching } = useViewBookQuery({ id });

  return (
    <Fragment>
      <Head>
        <title>Book View</title>
      </Head>
      <Page>
        <Page.Content>
          <Box m={4}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <Link color="inherit" href={`/book/${id}`}>
                Book
              </Link>
            </Breadcrumbs>
          </Box>
          <SpacingPaper>
            <Grid container justifyContent="center">
              {isFetching ? (
                <CircularProgress />
              ) : (
                data && (
                  <div className={classes.root}>
                    <Grid container spacing={3}>
                      <Grid item xs={5}>
                        <BookViewCard book={data} />
                      </Grid>
                      <Grid item xs={7}>
                        <BookViewDetails book={data} />
                      </Grid>
                    </Grid>
                  </div>
                )
              )}
            </Grid>
            <Box justifyContent="center">
              <BookSlider />
            </Box>
          </SpacingPaper>
        </Page.Content>
      </Page>
    </Fragment>
  );
};

BookShowPage.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;

  return { id };
};

export default BookShowPage;
