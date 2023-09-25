import * as S from "./Login.style";

function Login() {
  return (
    <S.LoginSection>
      <S.LoginButtonBox>
        <S.LoginButton id="kakao">카카오 로그인</S.LoginButton>
        <S.LoginButton id="naver">네이버 로그인</S.LoginButton>
      </S.LoginButtonBox>
    </S.LoginSection>
  );
}

export default Login;
