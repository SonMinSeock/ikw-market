import React from "react";
import styled from "styled-components";
import Logo from "../common/atoms/Logo";
import Input from "../common/atoms/Input";
import Nav from "./organism/Nav";
import { Link } from "react-router-dom";

const HeaderLayout = styled.header`
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
  background-color: #fff;
  h2 {
    margin-bottom: 15px;

    @media screen and (max-width: 860px) {
      display: none;
    }
  }
`;
const Header = () => {
  return (
    <HeaderLayout>
      <Link to={"/"}>
        <Logo>
          <h2>경운마켓</h2>
        </Logo>
      </Link>
      <Input background="#f2f2f2" width="13rem" height="35px" border="none" />
      <Nav />
    </HeaderLayout>
  );
};

export default Header;
