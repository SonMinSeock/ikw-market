import React from "react";
import * as S from "./Header.style";
import Logo from "../atoms/Logo/Logo";
import Nav from "../atoms/Nav/Nav";
const Header = () => {
  return (
    <S.Header>
      <Logo />
      <S.Input placeholder="물품 검색" />
      <Nav />
    </S.Header>
  );
};

export default Header;
