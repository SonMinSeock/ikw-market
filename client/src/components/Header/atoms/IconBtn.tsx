import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  // onClick: Function;
}

const IconButtonLayout = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  list-style-type: none;
`;

const IconButton = (props: React.PropsWithChildren<Props>) => {
  return <IconButtonLayout>{props.children}</IconButtonLayout>;
};

export default IconButton;
