import { useGetAuthorsQuery } from '@/store/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Author } from 'common';
import React, { Fragment, useEffect } from 'react';
import {
  DeepMap,
  FieldError,
  NestedValue,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

type Props = {
  register: UseFormRegister<Partial<{ authors: NestedValue<Author[]> }>>;
  setValue: UseFormSetValue<Partial<{ authors: NestedValue<Author[]> }>>;
  errors: DeepMap<{ authors: NestedValue<Author[]> }, FieldError>;
};

const AuthorMultiSelect = ({ register, setValue, errors }: Props) => {
  const classes = useStyles();
  const { data, isFetching } = useGetAuthorsQuery('');

  useEffect(() => {
    register('authors', {
      validate: (value) => value?.length || ('This is required.' as any),
    });
  }, [register]);

  return isFetching ? (
    <CircularProgress />
  ) : data ? (
    <Fragment>
      <Autocomplete
        multiple
        fullWidth
        limitTags={3}
        id="author-select"
        options={data}
        onChange={(e, options) => setValue('authors', options)}
        getOptionLabel={(option: Author) => option.name}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Author"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            error={Boolean(errors?.authors)}
            helperText={errors?.authors?.message}
          />
        )}
      />
    </Fragment>
  ) : null;
};

export default AuthorMultiSelect;
