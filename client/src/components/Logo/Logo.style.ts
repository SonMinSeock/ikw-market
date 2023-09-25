import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const LogoBox = styled.div`
  display: flex;
  justify-content: flex-end;
  & img {
    width: 65px;
    height: 65px;
    margin-right: 0.3rem;
  }

  & h2 {
    font-size: 1.3rem;
    margin: 0;
    display: flex;
    align-items: flex-end;
  }
`;
