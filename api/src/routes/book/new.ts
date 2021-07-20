import { BadRequestError } from 'common';
import express, { Request, Response } from 'express';
import { BookService } from '../../services/book.service';

const router = express.Router();

/**
 * The POST Book endpoint
 */
router.post('/api/books', async (req: Request, res: Response) => {
  const book = req.body;

  if (!book) {
    throw new BadRequestError('You must provide book data');
  }

  const bookService = BookService.getInstance();
  const bookTitle = bookService.addBook(book);

  const response = JSON.stringify(`Book ${bookTitle} was created`);
  res.send(response);
});

export { router as newBookRouter };
