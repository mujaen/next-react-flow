import React, { PropsWithChildren } from "react";

import styled from "@emotion/styled";

interface ButtonProps {
  isDisabled?: boolean;
  isSelected?: boolean;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button<Pick<ButtonProps, "color" | "isSelected">>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  outline: none;

  color: ${({ color }) => (color ? color : "black")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`;

function Button({
  isDisabled = false,
  isSelected = false,
  color,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <StyledButton
      color={color}
      isSelected={isSelected}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
