import { TextField } from '@material-ui/core';
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
} from '@material-ui/lab';
import React, { ReactNode, useCallback } from 'react';
import {
  Controller,
  ControllerProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

interface Props<T extends { [key: string]: any }>
  extends Pick<ControllerProps<T>, 'rules'>,
    Omit<
      AutocompleteProps<any, false, false, true>,
      'error' | 'onChange' | 'required' | 'renderInput'
    > {
  helperText?: ReactNode;
  label?: string;
  name: string;
  optionLabelField: string;
}

export const SingleSelect = <T extends { [key: string]: any }>({
  helperText,
  label,
  name,
  rules,
  optionLabelField,
  ...props
}: Props<T | FieldValues>) => {
  const {
    control,
    setValue,
    formState: { errors },
    watch,
    clearErrors,
    trigger,
  } = useFormContext();

  const value = watch(name);

  const handleOnChange = useCallback(
    (_e: unknown, option: T | null) => {
      setValue(name, option);
      if (option) {
        clearErrors();
      } else {
        trigger(name);
      }
    },
    [setValue, name, clearErrors, trigger]
  );

  const renderAutocomplete = useCallback(() => {
    return (
      <MuiAutocomplete
        options={(props && props?.options) || []}
        onChange={handleOnChange}
        getOptionLabel={(option: T) => option[optionLabelField]}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            error={Boolean(errors[name])}
            helperText={errors[name]?.message}
          />
        )}
      />
    );
  }, [handleOnChange, props, errors, optionLabelField, label, name]);

  return (
    <Controller
      control={control}
      defaultValue={value || []}
      name={name}
      render={renderAutocomplete}
      rules={rules}
    />
  );
};
