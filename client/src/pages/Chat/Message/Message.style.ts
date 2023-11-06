import styled from "styled-components";

export const ChatMessageLayout = styled.ul`
  padding: 8px 20px 9px;
`;
export const Chatting = styled.li<{ flexdirection: string }>`
  display: flex;
  padding: 8px 0px;
  flex-direction: ${(props) => props.flexdirection};
`;
export const ChatContent = styled.div`
  position: relative;
  float: left;
  padding-left: 40px;
`;
export const ProfileImgBox = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: skyblue;
`;

export const MessageInfoBox = styled.div`
  position: relative;
  box-sizing: border-box;
  padding-top: 23px;
  margin: 0px 42px 0px 7px;
`;
export const SendMessageInfoBox = styled(MessageInfoBox)`
  margin: 0px 7px 0px 42px;
`;
export const NameBox = styled.div`
  position: absolute;
  max-width: calc(100vw - var(--talk_info-padding));
  top: 2px;
  left: 0;
  line-height: 13px;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  span {
    font-weight: bold;
  }
`;

export const TimeBox = styled.div<{ left: string; right: string; textalign: string }>`
  position: absolute;
  font-size: 10px;
  right: ${(props) => props.right};
  text-align: ${(props) => props.textalign};
  left: ${(props) => props.left};
  bottom: 0;
  min-width: 83px;

  span {
    display: block;
    padding: 0 5px 0;
    font-size: 10px;
    color: #888;
    line-height: 1.2em;
    white-space: nowrap;
  }
`;

export const MessageBox = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 0;
  max-width: 100%;
  font-size: 12px;
  border-radius: 3px 16px 16px;
  line-height: 1.33;
  background-color: #f4f4f4;
  vertical-align: bottom;
  padding: 10px 14px;
  font-size: 15px;
  p {
    white-space: pre-wrap;
    width: fit-content;
    word-break: break-all;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 41%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-right-color: white;
    border-left: 0;
    border-top: 0;
    margin-top: -4px;
    margin-left: -8.5px;
  }
`;

export const SendMessageBox = styled(MessageBox)`
  float: right;
  border-radius: 16px 16px 3px;
  text-align: left;
  background-color: #d9f7e7;
`;
