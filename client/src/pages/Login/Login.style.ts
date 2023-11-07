import styled from "styled-components";

export const LoginSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const LoginLogoBox = styled.section`
  display: flex;
  justify-content: flex-end;
  & img {
    width: 65px;
    height: 65px;
    margin-right: 0.3rem;
  }

  & h2 {
    font-size: 1.3rem;
    margin: 0;
    display: flex;
    align-items: flex-end;
  }
`;

export const LoginButtonBox = styled.section`
  border: 1px solid #c6c6c6;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  & #kakao {
    width: 100%;
    height: 50px;
    margin-bottom: 0.9rem;
    cursor: pointer;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  border: none;
  min-width: 210px;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.3rem;
  cursor: pointer;

  &#naver {
    background-color: #2db500;
    color: #ffffff;
  }
`;
