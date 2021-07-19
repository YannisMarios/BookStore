import {
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      width: '70%',
    },
  })
);

type Props = {
  searchTerm: string;
  onSearchTermChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filters: string[];
  selectedFilter: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Search = ({
  searchTerm,
  onSearchTermChange,
  filters,
  selectedFilter,
  onFilterChange,
}: Props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <form noValidate autoComplete="off">
        <TextField
          id="search-input"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={onSearchTermChange}
          fullWidth={true}
        />
        <h3>Filters</h3>
        <RadioGroup
          aria-label="filters"
          name="filters"
          value={selectedFilter}
          onChange={onFilterChange}
          row
        >
          {filters.map((filter: string) => (
            <FormControlLabel
              key={filter}
              value={filter}
              control={<Radio />}
              label={filter}
            />
          ))}
        </RadioGroup>
      </form>
    </Grid>
  );
};
