import { NotFoundError } from 'common';
import express, { Request, Response } from 'express';
import { BookService } from '../../services/book.service';

const router = express.Router();

/**
 * The GET Book endpoint
 */
router.get('/api/books/:id', async (req: Request, res: Response) => {
  const bookService = BookService.getInstance();
  const book = bookService.getBook(req.params.id);

  if (!book) {
    throw new NotFoundError();
  }

  res.send(book);
});

export { router as showBookRouter };
