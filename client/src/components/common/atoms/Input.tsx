import React from "react";
import styled from "styled-components";

type Props = {
  background?: string;
  width?: string;
  height?: string;
  border?: string;
  // onClick?: Function;
};

const InputLayout = styled.input<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  background-color: ${(props) => props.background}; // background prop을 사용하도록 추가
  &:focus,
  &:active {
    outline: 2px solid #ffc901;
  }
`;

const Input = ({ background, width, height, border, ...props }: Props) => {
  return <InputLayout type="text" background={background} width={width} height={height} border={border} {...props} />;
};

export default Input;
