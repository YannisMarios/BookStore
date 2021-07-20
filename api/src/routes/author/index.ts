import express, { Request, Response } from 'express';
import { AuthorService } from '../../services/author.service';

const router = express.Router();

/**
 * The GET Authors endpoint
 */
router.get('/api/authors', (req: Request, res: Response) => {
  const authorService = AuthorService.getInstance();
  const authors = authorService.getAuthors();
  res.send(authors);
});

export { router as indexAuthorRouter };
