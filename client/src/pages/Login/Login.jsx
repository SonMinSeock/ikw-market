import * as S from "./Login.style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/common/atoms/Logo";
import KakaoBtnImg from "../../assets/button/kakao_login_medium_narrow.png";
import { useSetRecoilState } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";
import { loginAxiosObj } from "../../controller/login";

function Login() {
  // recoil
  const setIsLogin = useSetRecoilState(isLoginAtom);

  // naver api
  const { naver } = window;
  const navigate = useNavigate();
  const REDIRECT_URI = `${process.env.REACT_APP_LOCAL_URL}/login`;
  const [naverToken, setNaverToken] = useState();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: REDIRECT_URI,
    isPopup: false, // 팝업창으로 로그인을 진행할 것인지?
    loginButton: { color: "green", type: 3, height: 50 }, // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
  });

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    setNaverToken(token);
  };

  const initializeNaverLogin = () => {
    naverLogin.getLoginStatus(async function (status) {
      if (status) {
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
          const user = {
            email: naverLogin.user.email,
            social_id: { value: naverLogin.user.id, social_name: "네이버 로그인" },
            nickname: naverLogin.user.nickname,
            image: naverLogin.user.image,
          };

          // Naver Login POST Request
          await loginAxiosObj.naverLoginPostAxios(user);

          setIsLogin(true);
          navigate("/");
        }
      } else {
        userAccessToken();
      }
    });
  };

  useEffect(() => {
    naverLogin.init();
    if (window.location.href.includes("access_token")) {
      initializeNaverLogin();
    }
  }, []);

  // kakao api
  const [code, setCode] = useState();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_AUTH_URL = `${process.env.REACT_APP_KAKAO_REST_API_URL}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // kakao 버튼 클릭 핸들러
  const kakaoBtnOnClick = () => {
    // kakao 인가 코드 요청.
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    // kakao 인가 코드 받기.
    const searchCode = new URL(window.location.href);
    const codeParams = searchCode.searchParams.get("code");
    const grantType = "authorization_code";

    setCode(codeParams);

    if (code) {
      let kakaoURL = `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`;
      // kakao login POST Request
      loginAxiosObj.kakaoLoginPostAxios(kakaoURL, setIsLogin, navigate);
    }
  }, [code]);

  return (
    <S.LoginSection>
      <Logo />
      <S.LoginButtonBox>
        <img src={KakaoBtnImg} id="kakao" onClick={kakaoBtnOnClick} />
        <div id="naverIdLogin" onClick={initializeNaverLogin} />
      </S.LoginButtonBox>
    </S.LoginSection>
  );
}

export default Login;
