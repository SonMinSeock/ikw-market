import styled from "styled-components";

export const LogoBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
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
    @media screen and (max-width: 860px) {
      display: none;
    }
  }
`;
