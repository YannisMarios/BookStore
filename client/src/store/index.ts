import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { authorApi } from './author';
import { bookApi } from './book';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [bookApi.reducerPath]: bookApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
