import { AuthorsList } from '@/components/author/AuthorsList';
import {
  MultiSelect,
  Page,
  SingleSelect,
  SpacingPaper,
} from '@/components/shared';
import { useGetCategoriesQuery, useGetPublishersQuery } from '@/store/api';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  TextField,
} from '@material-ui/core';
import { Author, Category, Publisher } from 'common';
import Head from 'next/head';
import React, { FormEvent, Fragment } from 'react';
import {
  Controller,
  FormProvider,
  NestedValue,
  useForm,
} from 'react-hook-form';
import { addBookSchema } from './add-book.schema.ts';

const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  console.log(event);
};

interface FormInputs {
  title?: string;
  description?: string;
  authors?: Author[];
  categories?: NestedValue<Category[]>;
  publisher?: NestedValue<Publisher[]>;
  year: string;
  rating: string;
}

const defaultValues = {
  title: '',
  description: '',
  authors: [],
  categories: [],
  publisher: [],
  year: '',
  rating: '',
};

const BookAddPage = () => {
  const methods = useForm<FormInputs>({
    resolver: yupResolver(addBookSchema),
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { data: categories, isFetching: isFetchingCategories } =
    useGetCategoriesQuery('');
  const { data: publishers, isFetching: isFetchingPublishers } =
    useGetPublishersQuery('');

  return (
    <Fragment>
      <Head>
        <title>Add Book</title>
      </Head>
      <Page>
        <Page.Content>
          <Box m={4}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <div color="inherit">Book</div>
              <Link color="inherit" href={`/book/add`}>
                Add
              </Link>
            </Breadcrumbs>
          </Box>
          <SpacingPaper>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justifyContent="center">
                  <Grid container spacing={3}>
                    {/* Row */}
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        <Controller
                          name="title"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              fullWidth
                              error={Boolean(errors?.title)}
                              helperText={errors?.title?.message}
                              placeholder="Title"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                    {/* Row */}
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        <Controller
                          name="description"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              multiline
                              rows={5}
                              fullWidth
                              error={Boolean(errors?.description)}
                              helperText={errors?.description?.message}
                              placeholder="Description"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                    {/* Row */}
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        {!isFetchingCategories && categories && (
                          <MultiSelect<Category>
                            label="Select categories"
                            helperText=" "
                            name="categories"
                            options={categories || []}
                            optionLabelField="name"
                            maxSelectedItems={4}
                          />
                        )}
                      </Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                    {/* Row */}
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        <Controller
                          name="authors"
                          control={control}
                          defaultValue={[]}
                          rules={{ required: true }}
                          render={() => <AuthorsList />}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        {/* Row */}
                        <Grid container item xs={12} spacing={3}>
                          <Grid item xs={6}>
                            <Controller
                              name="rating"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  variant="outlined"
                                  fullWidth
                                  error={Boolean(errors?.rating)}
                                  helperText={errors?.rating?.message}
                                  placeholder="Rating"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Row */}
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        {!isFetchingPublishers && publishers && (
                          <SingleSelect<Publisher>
                            label="Select publisher"
                            helperText=" "
                            name="publisher"
                            options={publishers || []}
                            optionLabelField="name"
                          />
                        )}
                      </Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                    {/* Row */}
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        <Controller
                          name="year"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              fullWidth
                              error={Boolean(errors?.year)}
                              helperText={errors?.year?.message}
                              placeholder="Year"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                    {/* Row */}
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{ marginTop: 16, width: '200px' }}
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </SpacingPaper>
        </Page.Content>
      </Page>
    </Fragment>
  );
};

export default BookAddPage;
