import { configureStore } from '@reduxjs/toolkit';

import newsSlice from './news.slice';

export const store = configureStore({
  reducer: {
    news: newsSlice,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
