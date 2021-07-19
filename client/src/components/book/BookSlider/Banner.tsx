import { BookListItem } from '@/components/book';
import { Box, Grid, GridSpacing } from '@material-ui/core';
import { Book } from 'common';
import React from 'react';

export interface BannerContent {
  items: Book[];
}

type Props = {
  length?: number;
  spacing?: number;
  item: BannerContent;
};

const Banner = (props: Props) => {
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems;
  const spacing = props.spacing && props.spacing >= 0 ? props.spacing : 0;

  let items = [];

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.items[i];
    if (item) {
      const media = (
        <Grid item xs={3}>
          <Box style={{ width: '100%' }}>
            <BookListItem key={item.id} book={item} />
          </Box>
        </Grid>
      );
      items.push(media);
    }
  }

  return (
    <div className="Banner">
      <Grid
        container
        spacing={spacing as GridSpacing}
        className="BannerGrid"
        alignItems="center"
        justify="center"
      >
        {items}
      </Grid>
    </div>
  );
};

export default Banner;
