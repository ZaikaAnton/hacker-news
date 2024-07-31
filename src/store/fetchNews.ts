import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FeedItem } from '../types/FeedItem';
import { API_LINK, COUNT_PAGE, COUNT_NEWS } from '../constants/API_LINK';

export const fetchNews = createAsyncThunk<FeedItem[]>('news/fetchNews', async (): Promise<FeedItem[]> => {
  const news: Array<FeedItem> = [];

  try {
    for (let i = 1; i <= COUNT_PAGE; i++) {
      const response = await axios.get<Array<FeedItem>>(`${API_LINK}${i}.json`);
      news.push(...response.data);

      if (news.length >= COUNT_NEWS) {
        break;
      }
    }
    return news.slice(0, COUNT_NEWS);
  } catch (error) {
    throw new Error('Failed to fetch news');
  }
});
