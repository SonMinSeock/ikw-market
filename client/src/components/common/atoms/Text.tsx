import { String } from "aws-sdk/clients/cloudwatchevents";
import React from "react";
import styled from "styled-components";

type Props = {
  style?: StyleProps;
};

type StyleProps = {
  overflow?: string;
  textOverflow?: string;
  fontWeight?: string;
  fontSize?: string;
  wordBreak?: string;
  fontFamily?: string;
  margin?: string;
  padding?: string;
};

const TextLayout = styled.span<StyleProps>`
  overflow: ${(props) => props.overflow};
  text-overflow: ${(props) => props.textOverflow};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  word-break: ${(props) => props.wordBreak};
  font-family: ${(props) => props.fontFamily};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const Text = ({ style, children }: React.PropsWithChildren<Props>) => {
  return <TextLayout {...style}>{children}</TextLayout>;
};

export default Text;
