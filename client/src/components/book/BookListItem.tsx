import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Book } from 'common';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 150,
  },
  media: {
    height: 200,
  },
  center: {
    justifyContent: 'center',
  },
});

type Props = {
  book: Book;
};

export const BookListItem = ({ book }: Props) => {
  const classes = useStyles();
  return (
    <Link href={`/book/${book.id}`} passHref>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={book.image}
            title={book.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              align="center"
              className="capitalize"
            >
              {book.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.center}>
          <Rating name="read-only" value={book.rating} readOnly />
        </CardActions>
      </Card>
    </Link>
  );
};
