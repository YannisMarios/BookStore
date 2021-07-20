import * as yup from 'yup';

export const addBookSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[a-zA-Z0-9 ,@”#&*!]*$/, 'Character is not allowed')
    .min(10, 'Title cannot be less than 10 characters')
    .max(120, 'Title cannot exceed 120 characters'),
  description: yup
    .string()
    .required('Description is required')
    .matches(/^[A-Z][a-z0-9_-]*$/, 'First character must be uppercase')
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
    .required('Year is required')
    .matches(/^(?!0+)\d{4}$/, 'Invalid year'),
  rating: yup
    .string()
    .matches(/^(?:0|[1-9]\d+|)?(?:.?\d{0,1})?$/, 'Invalid Rating'),
});
