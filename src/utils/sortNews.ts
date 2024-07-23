import { FeedItem } from '../types/FeedItem';

export const sortNewsByDate = (news: FeedItem[]): FeedItem[] => {
  return [...news].sort((a, b) => b.time - a.time);
};
