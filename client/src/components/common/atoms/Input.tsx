import React from "react";
import styled from "styled-components";

type Props = {
  background?: string;
  w?: string;
  h?: string;
  border?: string;
  // onClick?: Function;
};

const InputLayout = styled.input<Props>`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  border: ${(props) => props.border};
  background-color: ${(props) => props.background}; // background prop을 사용하도록 추가
  &:focus,
  &:active {
    outline: 2px solid #ffc901;
  }
`;

const Input = ({ background, w, h, border, ...props }: React.PropsWithChildren<Props>) => {
  return (
    <InputLayout background={background} w={w} h={h} border={border} {...props}>
      {props.children}
    </InputLayout>
  );
};

export default Input;
