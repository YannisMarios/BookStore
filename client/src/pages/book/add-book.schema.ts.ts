import * as yup from 'yup';

const currentYear = new Date().getFullYear();
const currentYearParts = currentYear.toString().split('');
const yearRegex = new RegExp(
  '^(1[8-9][0-9][0-9]|200[0-9]|[0-' +
    currentYearParts[0] +
    '][0-' +
    currentYearParts[1] +
    '][0-' +
    currentYearParts[2] +
    '][0-' +
    currentYearParts[3] +
    '])$'
);

export const addBookSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[a-zA-Z0-9 ,@”#&*!]*$/, 'Character is not allowed')
    .min(10, 'Title cannot be less than 10 characters')
    .max(120, 'Title cannot exceed 120 characters'),
  description: yup
    .string()
    .required('Description is required')
    .matches(/^[A-Z][a-z0-9 _-]*$/, 'First character must be uppercase')
    .max(512, 'Description cannot exceed 512 characters'),
  categories: yup
    .array()
    .min(1, 'Categories is required')
    .max(4, 'You may select up to 4 categories'),
  authors: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Author name is required'),
    })
  ),
  publisher: yup.object().required('Publisher is required').nullable(),
  year: yup
    .string()
    .matches(yearRegex, `Year of publication between 1800 - ${currentYear}`),
  rating: yup
    .string()
    .matches(/^([0-4](\.\d)?|5)$/, 'Rating must be between 0 and 5'),
  pages: yup
    .string()
    .matches(
      /^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$/,
      'Number of pages must be between 1 and 9999'
    ),
  isbn10: yup.string().matches(/^\d{10}$/, 'Invalid ISBN-10'),
  isbn13: yup.string().matches(/^\d{13}$/, 'Invalid ISBN-13'),
});
