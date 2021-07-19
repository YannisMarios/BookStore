import { app } from './app';

export const start = () => {
  app.listen(3001, () => {
    console.log('🚀 Bookstore API listening on port 3001');
  });
};

start();
