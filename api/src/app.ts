import cors from 'cors';
import express from 'express';
import { indexAuthorRouter } from './routes/author';
import { indexBookRouter } from './routes/book';
import { showBookRouter } from './routes/book/show';
import { indexCategoryRouter } from './routes/category';
import { indexPublisherRouter } from './routes/publisher';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.use(indexBookRouter);
app.use(showBookRouter);
app.use(indexAuthorRouter);
app.use(indexPublisherRouter);
app.use(indexCategoryRouter);

app.all('*', (req, res) => {
  res.status(404).send('Not found');
});

export { app };
