import styled from "styled-components";

export const LoginSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginButtonBox = styled.div`
  border: 1px solid #c6c6c6;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
`;

export const LoginButton = styled.button`
  width: 100%;
  border: none;
  min-width: 210px;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.3rem;
  cursor: pointer;
  &#kakao {
    background-color: #fee501;
    color: #443f1c;
    margin-bottom: 0.9rem;
  }
  &#naver {
    background-color: #2db500;
    color: #ffffff;
  }
`;
