import React from "react";
import styled from "styled-components";

type Props = {
  style?: StyleProps;
};

type StyleProps = {
  fontWeight?: string;
  fontSize?: string;
  fontFamily?: string;
  margin?: string;
  padding?: string;
};

const ParagraphLayout = styled.p<StyleProps>`
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  word-break: break-all;
`;

const Paragraph = ({ style, children }: React.PropsWithChildren<Props>) => {
  return <ParagraphLayout {...style}>{children}</ParagraphLayout>;
};

export default Paragraph;
