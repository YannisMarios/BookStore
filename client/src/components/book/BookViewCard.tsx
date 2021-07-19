import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from '@material-ui/lab/Rating';
import { Author, Book } from 'common';
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 300,
  },
  center: {
    justifyContent: 'center',
  },
});

type Props = {
  book: Book;
};

export const BookViewCard = ({ book }: Props) => {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={book.image}
          title={book.title}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </Grid>
            <Grid item xs={10}>
              <Typography
                gutterBottom
                variant="body2"
                align="left"
                style={{ marginTop: '0.5rem' }}
              >
                {book.authors.map((author: Author) => author.name).join(', ')}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.center}>
        <Rating name="read-only" value={book.rating} size="large" readOnly />
      </CardActions>
    </Card>
  );
};
