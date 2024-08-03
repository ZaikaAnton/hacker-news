import { configureStore } from '@reduxjs/toolkit';

import newsSlice from './news.slice';
import newsDetailSlice from './newsDetail.slice';

export const store = configureStore({
  reducer: {
    news: newsSlice,
    newsDetail: newsDetailSlice,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
