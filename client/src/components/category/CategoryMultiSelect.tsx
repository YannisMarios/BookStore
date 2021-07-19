import { useGetCategoriesQuery } from '@/store/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'common';
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
  register: UseFormRegister<Partial<{ categories: NestedValue<Category[]> }>>;
  setValue: UseFormSetValue<Partial<{ categories: NestedValue<Category[]> }>>;
  errors: DeepMap<{ categories: NestedValue<Category[]> }, FieldError>;
};

const CategoryMultiSelect = ({ register, setValue, errors }: Props) => {
  const classes = useStyles();
  const { data, isFetching } = useGetCategoriesQuery('');

  useEffect(() => {
    register('categories', {
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
        id="category-select"
        options={data}
        onChange={(e, options) => setValue('categories', options)}
        getOptionLabel={(option: Category) => option.name}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Category"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            error={Boolean(errors?.categories)}
            helperText={errors?.categories?.message}
          />
        )}
      />
    </Fragment>
  ) : null;
};

export default CategoryMultiSelect;
