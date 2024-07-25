import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import parse from 'html-react-parser';

import { RootStore, AppDispatch } from '../../store/store';
import { fetchNewsDetail } from '../../store/fetchNewsDetail';
import Button from '../Button/Button';
import Comments from '../Comments/Comments';
import LoadingErrorFetch from '../LoadingErrorFetch/LoadingErrorFetch';

function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { newsDetail, isLoading, error } = useSelector((state: RootStore) => state.newsDetail);
  const navigate = useNavigate();

  const fetchDetails = () => {
    if (id) {
      dispatch(fetchNewsDetail(id));
    }
  };

  useEffect(() => {
    fetchDetails();

    const intervalId = setInterval(() => {
      fetchDetails();
      console.log('Перезапрос новостей');
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch, id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRefreshFetch = () => {
    fetchDetails();
    console.log('Перезапрос выполнен');
  };

  return (
    <LoadingErrorFetch isLoading={isLoading} error={error}>
      {newsDetail ? (
        <NewsDetailContainer>
          <Button onClick={handleBackClick}>Вернуться к списку новостей</Button>
          <Title>{newsDetail.title}</Title>
          <InfoAboutNew>
            <span>Author: {newsDetail.user}</span>
            <span>Date: {new Date(newsDetail.time * 1000).toLocaleDateString()}</span>
            <span>Comments: {newsDetail.comments_count}</span>
          </InfoAboutNew>
          <Link href={newsDetail.url} target="_blank" rel="noopener noreferrer">
            Ссылка на исходник
          </Link>
          <Content>{parse(newsDetail.content)}</Content>
          {newsDetail.comments && <Comments comments={newsDetail.comments} />}
          <Button onClick={handleRefreshFetch}>Перезапрос данных</Button>
        </NewsDetailContainer>
      ) : (
        <p>No news detail available.</p>
      )}
    </LoadingErrorFetch>
  );
}

export default NewsDetail;

const NewsDetailContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 15px 0;
`;

const InfoAboutNew = styled.div`
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;

  & > span {
    margin-right: 15px;
  }
`;

const Link = styled.a`
  font-size: 16px;
  color: blue;
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;
