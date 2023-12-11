import React from "react";
import styled from "styled-components";

type Props = {
  style?: StyleProps;
};

type StyleProps = {
  marginTop?: string;
  overflow?: string;
  textOverflow?: string;
  fontWeight?: string;
  fontSize?: string;
  wordBreak?: string;
  fontFamily?: string;
};

const TextLayout = styled.span<StyleProps>`
  overflow: ${(props) => props.overflow};
  text-overflow: ${(props) => props.textOverflow};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  word-break: ${(props) => props.wordBreak};
  font-family: ${(props) => props.fontFamily};
  margin-top: ${(props) => props.marginTop};
`;

const Text = ({ style, ...props }: React.PropsWithChildren<Props>) => {
  return <TextLayout {...style}>{props.children}</TextLayout>;
};

export default Text;
