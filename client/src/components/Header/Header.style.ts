import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  padding: 10px 23px 0px 10px;
  justify-content: space-between;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
  z-index: 999;
`;

export const Input = styled.input`
  background-color: #f2f2f2;
  width: 13rem;
  height: 35px;
  border: none;
  padding-left: 10px;
  @media screen and (max-width: 860px) {
    display: flex;
  }
`;
