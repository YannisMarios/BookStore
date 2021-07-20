import { AuthorsList } from '@/components/author/AuthorsList';
import {
  FaceForm,
  FullPageSpinner,
  MultiSelect,
  Page,
  SingleSelect,
  SpacingPaper,
} from '@/components/shared';
import AlertDialog from '@/components/shared/AlertDialog';
import {
  useAddBookMutation,
  useGetCategoriesQuery,
  useGetPublishersQuery,
} from '@/store/api';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  TextField,
} from '@material-ui/core';
import { Author, Book, Category, Publisher } from 'common';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  NestedValue,
  useForm,
} from 'react-hook-form';
import { addBookSchema } from './add-book.schema.ts';

interface FormInputs {
  title: string;
  description?: string;
  authors: Author[];
  categories: NestedValue<Category[]>;
  publisher: NestedValue<Publisher[]>;
  year: string;
  pages: string;
  rating: string;
  isbn10: string;
  isbn13: string;
}

const defaultValues = {
  title: '',
  description: '',
  authors: [],
  categories: [],
  publisher: [],
  pages: '',
  year: '',
  rating: '',
  isbn10: '',
  isbn13: '',
};

const BookAddPage = () => {
  const methods = useForm<FormInputs>({
    mode: 'all',
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
  const [addBook, { data, isLoading, error }] = useAddBookMutation();

  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogBody, setDialogBody] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(isLoading);
    if (data) {
      setDialogTitle('Success!!!');
      setDialogBody(data);
      setOpen(true);
    }

    if (error) {
      setDialogTitle('Error');
      setDialogBody('Something went wrong. Please try again later');
      setOpen(true);
    }
  }, [isLoading, data, error]);

  const onSubmit = async (formData: FormInputs) => {
    const book: Book = {
      title: formData.title || '',
      description: formData.description || '',
      authors: formData.authors?.map(({ name }) => ({ name })) || [],
      categories:
        formData.categories?.map(({ id, name }) => ({ id, name })) || [],
      publisher: {
        ...(formData.publisher as any),
      },
      year: +formData.year,
      rating: +formData.rating,
      pages: +formData.pages,
      isbn10: formData.isbn10,
      isbn13: formData.isbn13,
      image: '',
    };

    // Create the Book!
    await addBook(book);
  };

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
              <form
                onSubmit={handleSubmit(
                  async (formData) => await onSubmit(formData)
                )}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box mt={1}>
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
                    </Box>
                    <Box mt={2}>
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
                    </Box>
                    <Box mt={2}>
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
                    </Box>
                    <Box mt={2}>
                      <Controller
                        name="authors"
                        control={control}
                        defaultValue={[]}
                        rules={{ required: true }}
                        render={() => <AuthorsList />}
                      />
                    </Box>
                    <Box mt={2}>
                      {!isFetchingPublishers && publishers && (
                        <SingleSelect<Publisher>
                          label="Select publisher"
                          helperText=" "
                          name="publisher"
                          options={publishers || []}
                          optionLabelField="name"
                        />
                      )}
                    </Box>
                    <Box mt={2}>
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
                    </Box>
                    <Box mt={2}>
                      <Controller
                        name="pages"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors?.pages)}
                            helperText={errors?.pages?.message}
                            placeholder="Pages"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  {/* SECOND COLUMN */}
                  <Grid item xs={6}>
                    <Grid container justifyContent="center">
                      <FaceForm saveFace={() => {}} />
                    </Grid>
                    <Box mt={2}>
                      <Controller
                        name="rating"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors?.rating)}
                            helperText={errors?.rating?.message}
                            placeholder="Rating (0-5)"
                          />
                        )}
                      />
                    </Box>
                    <Box mt={2}>
                      <Controller
                        name="isbn10"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors?.isbn10)}
                            helperText={errors?.isbn10?.message}
                            placeholder="ISBN-10"
                          />
                        )}
                      />
                    </Box>
                    <Box mt={2}>
                      <Controller
                        name="isbn13"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors?.isbn13)}
                            helperText={errors?.isbn13?.message}
                            placeholder="ISBN-13"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box mt={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: 16, width: '200px' }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
            <AlertDialog
              title={dialogTitle}
              body={dialogBody}
              open={open}
              setOpen={setOpen}
              okCallback={() => router.push('/')}
            />
            <FullPageSpinner loading={loading} setLoading={setLoading} />
          </SpacingPaper>
        </Page.Content>
      </Page>
    </Fragment>
  );
};

export default BookAddPage;
