import styled from 'styled-components';
import { Item } from '../../types/Item';
import Comment from '../Comment/Comment';

interface CommentsProps {
  comments: Item[];
}

function Comments({ comments }: CommentsProps) {
  const filteredComments = comments.filter((comment) => !comment.deleted);
  return (
    <CommentsContainer>
      {filteredComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </CommentsContainer>
  );
}

export default Comments;

const CommentsContainer = styled.div`
  margin-top: 20px;
  padding-left: 20px;
  border-left: 2px solid #ddd;
`;
