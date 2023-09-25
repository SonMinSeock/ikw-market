import React from "react";
import S from "./Login.styled";
import LogoImage from "../../../assets/logo/logo.png";

function Login() {
  return (
    <S.LoginSection>
      <S.LoginHeader>
        <S.LoginLogoBox>
          <img src={LogoImage} alt="로고 이미지" />
          <h2>경운마켓</h2>
        </S.LoginLogoBox>
      </S.LoginHeader>
      <S.LoginButtonBox>
        <S.LoginButton id="kakao">카카오 로그인</S.LoginButton>
        <S.LoginButton id="naver">네이버 로그인</S.LoginButton>
      </S.LoginButtonBox>
    </S.LoginSection>
  );
}

export default Login;
