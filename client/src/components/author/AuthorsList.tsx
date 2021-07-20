import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const AuthorsList = () => {
  const [inputList, setInputList] = useState([{ name: '' }]);
  const {
    control,
    setValue,
    formState: { errors, dirtyFields, isSubmitted },
    watch,
    trigger,
    register,
    clearErrors,
  } = useFormContext();

  const value = watch('authors');

  // handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...inputList];

    //@ts-ignore
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    if (list.length === 0) {
      trigger('authors');
    }
  };

  useEffect(() => {
    setValue('authors', inputList);
    const emptyAuthor = inputList.find((x) => !x.name);
    if (isSubmitted && emptyAuthor) {
      trigger('authors');
    } else {
      clearErrors();
    }
  }, [inputList, setValue, dirtyFields, isSubmitted, trigger, clearErrors]);

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: '' }]);
  };

  return (
    <Paper>
      <Grid container spacing={1}>
        <Box m={2} width={1}>
          {inputList.map((x, i) => {
            return (
              <Box key={i} mb={1} width={1}>
                <TextField
                  name="name"
                  placeholder="Enter Author name"
                  value={x.name}
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, i)}
                  fullWidth
                  error={Boolean(
                    errors['authors'] && errors['authors'][i]?.name
                  )}
                  helperText={
                    errors['authors'] && errors['authors'][i]?.name?.message
                  }
                  InputProps={{
                    endAdornment: (
                      <>
                        {inputList.length !== 1 && (
                          <InputAdornment position="end">
                            <IconButton
                              style={{
                                color: 'red',
                                padding: '1px',
                              }}
                              aria-label="remove-author"
                              component="span"
                              onClick={() => handleRemoveClick(i)}
                            >
                              <RemoveCircle />
                            </IconButton>
                          </InputAdornment>
                        )}
                        {inputList.length - 1 === i && inputList.length < 4 && (
                          <InputAdornment position="end">
                            <IconButton
                              style={{
                                color: 'green',
                                padding: '1px',
                              }}
                              aria-label="add-author"
                              component="span"
                              onClick={handleAddClick}
                            >
                              <AddCircle />
                            </IconButton>
                          </InputAdornment>
                        )}
                      </>
                    ),
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Paper>
  );
};
