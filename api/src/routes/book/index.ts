import { BookFilterEnum } from 'common';
import express, { Request, Response } from 'express';
import { BookService } from '../../services/book.service';

const router = express.Router();

router.get('/api/books', (req: Request, res: Response) => {
  const bookService = BookService.getInstance();
  let searchTerm = '';
  let pageNumber = 1;
  let pageSize = 10;
  let filter;

  if (req.query['searchTerm']) {
    searchTerm = req.query['searchTerm'] as string;
  }

  if (req.query['filter']) {
    filter = req.query['filter'] as unknown;
  }

  if (req.query['pageNumber']) {
    pageNumber = +req.query['pageNumber'];
  }

  if (req.query['pageSize']) {
    pageSize = +req.query['pageSize'];
  }

  const books = bookService.searchBooksPaginated(
    { searchTerm, filter: filter as BookFilterEnum },
    { pageNumber, pageSize }
  );

  res.send(books);
});

export { router as indexBookRouter };
