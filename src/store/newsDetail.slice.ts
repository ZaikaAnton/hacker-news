import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types/Item';
import { fetchNewsDetail } from './fetchNewsDetail';

export interface NewsDetailState {
  newsDetail: Item | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsDetailState = {
  newsDetail: null,
  isLoading: false,
  error: null,
};

const newsDetailSlice = createSlice({
  name: 'newsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewsDetail.fulfilled, (state, action: PayloadAction<Item>) => {
        state.isLoading = false;
        state.newsDetail = action.payload;
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default newsDetailSlice.reducer;
