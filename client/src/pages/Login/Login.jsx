import S from "./Login.styled";
import LogoImage from "../../assets/logo/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { naver } = window;
  const navigate = useNavigate();

  const NAVER_CLIENT_ID = "pjzQMKEYCIadgjpObQpq"; // 발급 받은 Client ID 입력
  const NAVER_CALLBACK_URL = "http://localhost:3000/login"; // 작성했던 Callback URL 입력

  const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: NAVER_CALLBACK_URL,
    isPopup: false, // 팝업창으로 로그인을 진행할 것인지?
    loginButton: { color: "green", type: 3, height: 50 }, // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
  });

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    //console.log(token);
  };

  const initializeNaverLogin = () => {
    naverLogin.init();

    naverLogin.getLoginStatus(function (status) {
      if (status) {
        //console.log(`user : `, naverLogin.user);

        userAccessToken();
        const nickName = naverLogin.user.getNickName();
        const name = naverLogin.user.getName();
        const email = naverLogin.user.getEmail();

        if (nickName === null || nickName === undefined) {
          alert("별명이 필요합니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        } else if (name === null || name === undefined) {
          alert("실명 필요합니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        } else if (email === null || email === undefined) {
          alert("이메일 필요합니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        } else {
          // 홈으로 리다이렉트
          navigate("/", { state: { user: { ...naverLogin.user } } });
        }
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

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
        <div id="naverIdLogin" />
        {/* <S.LoginButton id="naver">네이버 로그인</S.LoginButton> */}
      </S.LoginButtonBox>
    </S.LoginSection>
  );
}

export default Login;
