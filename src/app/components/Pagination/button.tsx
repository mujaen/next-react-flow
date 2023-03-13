import Button from 'components/Button';
import React from 'react';
import styled from 'styled-components';

interface ButtonPageProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  fontWeight?: string;
}

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;

  :hover {
    background-color: #eeeeee;
  }

  :active {
    background-color: #e6e6e6;
  }
`;

const ButtonPage: React.FunctionComponent<ButtonPageProps> = ({
  disabled,
  onClick,
  color,
  fontWeight,
  children,
}) => (
  <StyledButton
    width="40px"
    height="40px"
    padding="0"
    borderRadius="50%"
    bgColor="white"
    color={color}
    fontSize="18px"
    fontWeight={fontWeight}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default ButtonPage;
