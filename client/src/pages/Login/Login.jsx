import * as S from "./Login.style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import axios from "axios";

function Login() {
  // naver api
  const { naver } = window;
  const navigate = useNavigate();
  const REDIRECT_URI = process.env.REACT_APP_CALLBACK_URL;

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

  // kakao api
  const [code, setCode] = useState();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
      axios
        .post(
          kakaoURL,
          {},
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res) => {
          const { access_token } = res.data;
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
              }
            )
            .then((res) => {
              console.log("카카오 유저 데이터 : ", res.data);
            });
        });
    }
  }, [code]);

  return (
    <S.LoginSection>
      <Logo />
      <S.LoginButtonBox>
        <S.LoginButton id="kakao" onClick={kakaoBtnOnClick}>
          카카오 로그인
        </S.LoginButton>
        <div id="naverIdLogin" />
        {/* <S.LoginButton id="naver">네이버 로그인</S.LoginButton> */}
      </S.LoginButtonBox>
    </S.LoginSection>
  );
}

export default Login;
