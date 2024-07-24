import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_LINK_ITEM } from '../constants/API_LINK';
import { Item } from '../types/Item';

export const fetchNewsDetail = createAsyncThunk<Item, string>('newsDetail/fetchNewsDetail', async (id: string) => {
  const response = await axios.get<Item>(`${API_LINK_ITEM}${id}.json`);
  return response.data;
});
