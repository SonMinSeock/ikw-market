// Image 컴포넌트
import React, { CSSProperties } from "react";
import styled, { css } from "styled-components";

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
  flex?: string;
  margin?: string;
  mediaQuery?: {
    width?: string;
    height?: string;
  };
};

const ImageLayout = styled.img<StyleProps>`
  flex: ${(props) => props.flex};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  object-fit: ${(props) => props.objectFit};
  cursor: ${(props) => props.cursor};

  @media screen and (max-width: 860px) {
    width: ${(props) => props.mediaQuery?.width};
    height: ${(props) => props.mediaQuery?.height};
  }
`;

const Image = ({ style, src, alt }: Props) => {
  return <ImageLayout src={src} alt={alt} {...style} />;
};

export default Image;
