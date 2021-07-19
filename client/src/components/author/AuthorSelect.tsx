import { Author } from '@/../common/build';
import { useGetAuthorsQuery } from '@/store/author';
import { FormHelperText } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Fragment } from 'react';
import { WrappedFieldProps } from 'redux-form';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function AuthorSelect({
  input,
  meta: { touched, error },
}: WrappedFieldProps) {
  const classes = useStyles();
  const { onChange } = input;
  const { data, isFetching } = useGetAuthorsQuery('');

  const renderFromHelper = () => {
    if (!(touched && error)) {
      return;
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>;
    }
  };

  return isFetching ? (
    <CircularProgress />
  ) : data ? (
    <Fragment>
      <Autocomplete
        multiple
        style={{ width: 300 }}
        limitTags={3}
        id="author-select"
        options={data}
        value={input.value || []}
        onChange={(_, newValue: Author[] | null) => {
          console.log(newValue);
          onChange(newValue);
        }}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Author"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
      {renderFromHelper()}
    </Fragment>
  ) : null;
}
