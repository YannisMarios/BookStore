import express, { Request, Response } from 'express';
import { CategoryService } from '../../services/category.service';

const router = express.Router();

/**
 * The GET Categories endpoint
 */
router.get('/api/categories', (req: Request, res: Response) => {
  const categoryService = CategoryService.getInstance();
  const categories = categoryService.getCategories();
  res.send(categories);
});

export { router as indexCategoryRouter };
