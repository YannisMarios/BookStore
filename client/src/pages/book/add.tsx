import AuthorSelect from '@/components/author/AuthorSelect';
import { Page, SpacingPaper } from '@/components/shared';
import {
  Box,
  Breadcrumbs,
  FormControl,
  Grid,
  Link,
  TextField,
} from '@material-ui/core';
import { Book } from 'common';
import Head from 'next/head';
import React, { Fragment } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
  WrappedFieldProps,
} from 'redux-form';

const validate = (values: any) => {
  const errors: any = {};
  const requiredFields = [
    'title',
    'description',
    'categories',
    'authors',
    'year',
    'pages',
    'rating',
    'isbn10',
    'isbn13',
    'image',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}: any) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderSelectField = ({ input, meta }: WrappedFieldProps) => (
  <FormControl error={meta.touched && meta.error}>
    <AuthorSelect input={input} meta={meta} />
  </FormControl>
);

const onSubmit = (values: Book) => {
  console.log(values);
};

const BookAddPage = (props: InjectedFormProps<Book>) => {
  const { handleSubmit, pristine, reset, submitting } = props;

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
            <Grid container justifyContent="center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box m={3}>
                  <Field
                    name="title"
                    component={renderTextField}
                    label="Title"
                  />
                </Box>
                <Box m={3}>
                  <Field
                    name="authors"
                    component={renderSelectField}
                    label="Authors"
                  />
                </Box>
                <div>
                  <button type="submit">Submit</button>
                  <button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Clear Values
                  </button>
                </div>
              </form>
            </Grid>
          </SpacingPaper>
        </Page.Content>
      </Page>
    </Fragment>
  );
};

export default reduxForm<Book>({
  form: 'BookAddPage', // a unique identifier for this form
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BookAddPage);
