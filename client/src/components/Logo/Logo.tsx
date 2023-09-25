import React from "react";
import * as S from "./Logo.style";
import LogoImage from "../../assets/logo/logo.png";
const Logo = () => {
  return (
    <S.LogoBox>
      <img src={LogoImage} alt="로고 이미지" />
      <h2>경운마켓</h2>
    </S.LogoBox>
  );
};

export default Logo;
