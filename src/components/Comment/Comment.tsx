import styled from 'styled-components';
import { useState } from 'react';
import parse from 'html-react-parser';

import { Item } from '../../types/Item';
import Comments from '../Comments/Comments';

interface CommentProps {
  comment: Item;
}
function Comment({ comment }: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = comment.comments.length > 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (comment.deleted || comment.dead) {
    return null;
  }

  return (
    <CommentContainer>
      <CommentHeader onClick={hasChildren ? toggleExpand : undefined} $clickable={hasChildren}>
        <CommentAuthor>{comment.user}</CommentAuthor>
        <CommentContent>{parse(comment.content)}</CommentContent>
      </CommentHeader>
      {isExpanded && comment.comments.length > 0 && <Comments comments={comment.comments} />}
    </CommentContainer>
  );
}

export default Comment;

const CommentContainer = styled.div`
  margin-bottom: 10px;
`;

const CommentHeader = styled.div<{ $clickable: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  margin-bottom: 5px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentContent = styled.div`
  margin-bottom: 5px;
`;
