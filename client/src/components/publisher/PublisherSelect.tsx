import { useGetPublishersQuery } from '@/store/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Publisher } from 'common';
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
  register: UseFormRegister<Partial<{ publisher: NestedValue<Publisher[]> }>>;
  setValue: UseFormSetValue<Partial<{ publisher: NestedValue<Publisher[]> }>>;
  errors: DeepMap<{ publisher: NestedValue<Publisher[]> }, FieldError>;
};

const PublisherMultiSelect = ({ register, setValue, errors }: Props) => {
  const classes = useStyles();
  const { data, isFetching } = useGetPublishersQuery('');

  useEffect(() => {
    register('publisher', {
      validate: (value) => value?.length || ('This is required.' as any),
    });
  }, [register]);

  return isFetching ? (
    <CircularProgress />
  ) : data ? (
    <Fragment>
      <Autocomplete
        fullWidth
        limitTags={3}
        id="publisher-select"
        options={data}
        onChange={(e, option) => setValue('publisher', option ? [option] : [])}
        getOptionLabel={(option: Publisher) => option.name}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Publisher"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            error={Boolean(errors?.publisher)}
            helperText={errors?.publisher?.message}
          />
        )}
      />
    </Fragment>
  ) : null;
};

export default PublisherMultiSelect;
