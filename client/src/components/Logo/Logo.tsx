import React from "react";
import * as S from "./Logo.style";
import LogoImage from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"}>
      <S.LogoBox>
        <img src={LogoImage} alt="로고 이미지" />
        <h2>경운마켓</h2>
      </S.LogoBox>
    </Link>
  );
};

export default Logo;
