import styled from "styled-components";

export const ChatLayout = styled.div`
  display: flex;
  border: 1px solid #dfe1e2;
  position: relative;
  flex-direction: column;
  padding-top: 64px;
  margin: 0 auto;
  flex: 1;
  overflow: hidden;
  width: 100%;
  max-width: 680px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;
export const ChatHeaderBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfe1e2;
  /* color: #fff; */
  height: 42px;
  h3 {
    margin-left: 10px;
    font-weight: bold;
  }
`;
export const ChatContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const ChatLogBox = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const InputBox = styled.div`
  position: relative;
  border-top: 1px solid rgb(246, 246, 246);
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  padding: 12px 10px;
`;
export const Input = styled.input`
  position: relative;
  overflow-y: auto;
  width: 100%;
  max-height: 120px;
  border: 0 none;
  font-size: 13px;
  line-height: 1.33em;
  background-color: #f5f6f8;
  font-family: Apple SD Gothic Neo, 맑은 고딕, Malgun Gothic, 돋움, dotum, sans-serif;
  resize: none;
  outline: transparent;
  color: #000;
  vertical-align: top;
  border-radius: 20px;
  padding: 15px 70px 13px 10px;
  box-sizing: border-box;
  background-color: #f5f6f8;
`;
export const Button = styled.button`
  background-color: #fff;
  border: none;
  color: ${(props) => (props.disabled ? "#797575" : "#F79F1F")};
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  margin-top: 4px;
  padding: 0 3px;
`;
