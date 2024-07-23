import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootStore, AppDispatch } from '../../store/store';
import { fetchNews } from '../../store/fetchNews';
import { FeedItem } from '../../types/FeedItem';
import { sortNewsByDate } from '../../utils/sortNews';

function NewsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { news, isLoading, error } = useSelector((state: RootStore) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const sortedNews = sortNewsByDate(news);

  return (
    <NewsListContainer>
      {sortedNews.map((item: FeedItem, index: number) => (
        <NewsItem key={item.id}>
          <Number>{index + 1}</Number>
          <Title>{item.title}</Title>
          <Meta>
            <span>Points: {item.points}</span>
            <span>Author: {item.user}</span>
            <span>Date: {new Date(item.time * 1000).toLocaleDateString()}</span>
          </Meta>
        </NewsItem>
      ))}
    </NewsListContainer>
  );
}

export default NewsList;

const NewsListContainer = styled.div`
  padding: 20px;
`;

const NewsItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 10px;
  display: flex;
  align-items: center;
`;

const Number = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #333;
  width: 30px;
`;

const Title = styled.h2`
  font-size: 18px;
  padding-right: 10px;
`;

const Meta = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
  display: flex;
  gap: 10px;
`;
