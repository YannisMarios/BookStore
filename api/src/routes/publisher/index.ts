import express, { Request, Response } from 'express';
import { PublisherService } from '../../services/publisher.service';

const router = express.Router();

/**
 * The GET Publishers endpoint
 */
router.get('/api/publishers', (req: Request, res: Response) => {
  const publisherService = PublisherService.getInstance();
  const publishers = publisherService.getPublishers();
  res.send(publishers);
});

export { router as indexPublisherRouter };
