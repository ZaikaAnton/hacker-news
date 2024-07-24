import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootStore, AppDispatch } from '../../store/store';
import { fetchNewsDetail } from '../../store/fetchNewsDetail';
import Button from '../Button/Button';

function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { newsDetail, isLoading, error } = useSelector((state: RootStore) => state.newsDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsDetail(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!newsDetail) {
    return <p>No news detail available.</p>;
  }

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <NewsDetailContainer>
      <Button onClick={handleBackClick}>Вернуться к списку новостей</Button>
      <Title>{newsDetail.title}</Title>
      <InfoAboutNew>
        <span>Author: {newsDetail.user}</span>
        <span>Date: {new Date(newsDetail.time * 1000).toLocaleDateString()}</span>
        <span>Comments: {newsDetail.comments_count}</span>
      </InfoAboutNew>
      <Link href={newsDetail.url} target="_blank" rel="noopener noreferrer">
        Url: {newsDetail.url}
      </Link>
      <Content>{newsDetail.content}</Content>
    </NewsDetailContainer>
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
