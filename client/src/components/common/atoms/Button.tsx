// Button.tsx
import React from "react";
import styled from "styled-components";

type Props = {
  style?: StyleProps;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type StyleProps = {
  display?: string;
  flexDirection?: string;
  cursor?: string;
  color?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  width?: string;
  height?: string;
  flex?: string;
  backgroundColor?: string;
  borderRadius?: string;
  border?: string;
  fontFamily?: string;
  fontSize?: string;
  padding?: string;
  textDecoration?: string;
  margin?: string;
};

const ButtonLayout = styled.button<StyleProps>`
  cursor: ${(props) => props.cursor};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  gap: ${(props) => props.gap};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  padding: ${(props) => props.padding};
  text-decoration: ${(props) => props.textDecoration};
  margin: ${(props) => props.margin};
`;

const Button = ({ onClick, style, type, children }: React.PropsWithChildren<Props>) => {
  return (
    <ButtonLayout onClick={onClick} type={type} {...style}>
      {children}
    </ButtonLayout>
  );
};

export default Button;
