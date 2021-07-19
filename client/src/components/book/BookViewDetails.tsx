import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Book, Category } from 'common';
import React, { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2),
      },
    },
  })
);

type Props = {
  book: Book;
};

export const BookViewDetails = ({ book }: Props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box pl={6} pt={1}>
        <Typography gutterBottom variant="h5" className="capitalize">
          {book.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {book.description.capitalize()}
        </Typography>
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FavoriteIcon />}
          >
            Favorite
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
        </div>
        <Box mt={3} mb={1}>
          <dl>
            <dt>Category:</dt>
            <dd>
              {book.categories
                .map((category: Category) => category.name)
                .join(', ')}
            </dd>
          </dl>
          <dl>
            <dt>Year: </dt>
            <dd>{`${book.published}`.toDate('yyyy').getFullYear()}</dd>
          </dl>
          <dl>
            <dt>Number of Pages: </dt>
            <dd>{book.pages}</dd>
          </dl>
        </Box>
        <Box mt={3} mb={3}>
          <dl>
            <dt>Publisher: </dt>
            <dd>{book.publisher.name}</dd>
          </dl>
        </Box>
        <Box mt={1} mb={3}>
          <dl>
            <dt>ISBN-10: </dt>
            <dd>{book.isbn10}</dd>
          </dl>
          <dl>
            <dt>ISBN-13: </dt>
            <dd>{book.isbn13}</dd>
          </dl>
        </Box>
        <Box display="flex" mt={4} pr={4} justifyContent="center">
          <Button
            size="large"
            variant="contained"
            style={{ width: '60%' }}
            color="primary"
          >
            BUY
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};
