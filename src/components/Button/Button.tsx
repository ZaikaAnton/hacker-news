import styled from 'styled-components';
import { CSSProperties } from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: CSSProperties;
}

function Button({ children, onClick, style }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
