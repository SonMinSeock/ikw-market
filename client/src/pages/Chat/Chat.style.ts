import styled from "styled-components";

export const ChatLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 64px;
  margin: 0 auto;
  flex: 1;
  overflow: hidden;
  width: 100%;
  max-width: 680px;
  height: 100vh;
  /* overflow-y: hidden;
  overflow-x: auto; */
  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;
export const ChatHeaderBox = styled.div``;
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
  min-height: 50px;
  padding: 7px 55px 7px 16px;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
`;
export const Input = styled.input`
  position: relative;
  overflow-y: auto;
  width: 100%;
  max-height: 57px;
  border: 0 none;
  font-size: 10px;
  line-height: 1.33em;
  background-color: #f5f6f8;
  font-family: Apple SD Gothic Neo, 맑은 고딕, Malgun Gothic, 돋움, dotum, sans-serif;
  resize: none;
  outline: transparent;
  color: #000;
  vertical-align: top;
  border-radius: 20px;
  padding: 9px 70px 7px 10px;
  box-sizing: border-box;
  background-color: #f5f6f8;
`;
export const Button = styled.button`
  position: absolute;
  overflow: hidden;
  height: 36px;
  padding: 0 5px;
  bottom: 10px;
  right: 0;
  margin-right: 12px;
  background-color: #fff;
  border: none;
  color: ${(props) => (props.disabled ? "#797575" : "#4E6AFF")};
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
`;
