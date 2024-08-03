import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { RootStore, AppDispatch } from '../../store/store';
import { fetchNews } from '../../store/fetchNews';
import { FeedItem } from '../../types/FeedItem';
import { sortNewsByDate } from '../../utils/sortNews';
import Button from '../Button/Button';
import LoadingErrorFetch from '../LoadingErrorFetch/LoadingErrorFetch';

function NewsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { news, isLoading, error } = useSelector((state: RootStore) => state.news);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');

    dispatch(fetchNews()).then(() => {
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }
    });

    const intervalId = setInterval(() => {
      dispatch(fetchNews());
      console.log('Перезапрос новостей');
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
      sessionStorage.setItem('scrollPosition', scrollPositionRef.current.toString());
    };

    const handleScrollWithRAF = () => requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', handleScrollWithRAF);

    return () => {
      window.removeEventListener('scroll', handleScrollWithRAF);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('scrollPosition');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sortedNews = sortNewsByDate(news);

  const handleClick = () => {
    dispatch(fetchNews());
    console.log('Вы перезапросили новости');
  };

  return (
    <LoadingErrorFetch isLoading={isLoading} error={error}>
      <NewsListContainer>
        <Button onClick={handleClick} style={{ marginBottom: '25px' }}>
          Обновить Новости
        </Button>
        {sortedNews.map((item: FeedItem, index: number) => (
          <NewsItem key={item.id}>
            <Number>{index + 1}</Number>
            <StyledLink to={`/news/${item.id}`}>
              <Title>{item.title}</Title>
            </StyledLink>
            <InfoAboutNew>
              <span>Points: {item.points}</span>
              <span>Author: {item.user}</span>
              <span>Date: {new Date(item.time * 1000).toLocaleDateString()}</span>
            </InfoAboutNew>
          </NewsItem>
        ))}
      </NewsListContainer>
    </LoadingErrorFetch>
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

const InfoAboutNew = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
  display: flex;
  gap: 10px;
  & > span {
    margin-right: 15px;
  }
`;

const StyledLink = styled(Link)`
  color: #263c3f;
  text-decoration: none;
`;
