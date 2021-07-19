import AuthorMultiSelect from '@/components/author/AuthorMultiSelect';
import CategoryMultiSelect from '@/components/category/CategoryMultiSelect';
import PublisherSelect from '@/components/publisher/PublisherSelect';
import { Page, SpacingPaper } from '@/components/shared';
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
import { Controller, NestedValue, useForm } from 'react-hook-form';

const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  console.log(event);
};

const defaultValues = { title: '', authors: [], categories: [], publisher: [] };

const BookAddPage = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    title?: string;
    authors?: NestedValue<Author[]>;
    categories?: NestedValue<Category[]>;
    publisher?: NestedValue<Publisher[]>;
  }>({
    defaultValues,
  });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container justifyContent="center">
                <Grid container spacing={3}>
                  {/* Row */}
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        {...register('title', {
                          required: 'This is required.',
                        })}
                        error={Boolean(errors?.authors)}
                        helperText={errors?.title?.message}
                        variant="outlined"
                        fullWidth
                        label="Title"
                      />
                      {/* <Controller
                        render={({ field }) => (
                          <OutlinedInput
                            {...field}
                            error={Boolean(errors?.title)}
                            fullWidth
                          />
                        )}
                        name="title"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=""
                      />
                      <ErrorMessage errors={errors} name="title" /> */}
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                  {/* Row */}
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
                      <Controller
                        render={() => (
                          <AuthorMultiSelect
                            register={register}
                            setValue={setValue}
                            errors={errors}
                          />
                        )}
                        name="authors"
                        control={control}
                        defaultValue={[]}
                      />
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                  {/* Row */}
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
                      <Controller
                        render={() => (
                          <CategoryMultiSelect
                            register={register}
                            setValue={setValue}
                            errors={errors}
                          />
                        )}
                        name="categories"
                        control={control}
                        defaultValue={[]}
                      />
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                  {/* Row */}
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
                      <Controller
                        render={() => (
                          <PublisherSelect
                            register={register}
                            setValue={setValue}
                            errors={errors}
                          />
                        )}
                        name="publisher"
                        control={control}
                        defaultValue={[]}
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
          </SpacingPaper>
        </Page.Content>
      </Page>
    </Fragment>
  );
};

export default BookAddPage;
