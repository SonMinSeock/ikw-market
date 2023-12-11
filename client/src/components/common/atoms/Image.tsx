// Image 컴포넌트
import React from "react";
import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
  style?: StyleProps;
};

type StyleProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: string;
  cursor?: string;
};

const ImageLayout = styled.img<StyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  object-fit: ${(props) => props.objectFit};
  cursor: ${(props) => props.cursor};
`;

const Image = ({ style, src, alt }: Props) => {
  return <ImageLayout src={src} alt={alt} {...style} />;
};

export default Image;
