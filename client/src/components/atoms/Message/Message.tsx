import React from "react";
import * as S from "./Message.style";

const Message = () => {
  const chatMessages = [
    {
      user: { _id: 1 },
      name: "suzi",
      message: "안녕하세요!",
      createdAt: "14:30",
    },
    {
      user: { _id: 1 },
      name: "suzi",
      message: "안녕하세요!",
      createdAt: "14:30",
    },
    {
      user: { _id: 1 },
      name: "suzi",
      message: "안녕하세요!",
      createdAt: "14:30",
    },
    {
      user: { _id: 1 },
      name: "suzi",
      message:
        "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요!",
      createdAt: "14:30",
    },
    {
      user: { _id: 2 },
      name: "suzi",
      message: "안녕하세요!",
      createdAt: "14:30",
    },
    {
      user: { _id: 2 },
      name: "suzi",
      message: "안녕하세요!",
      createdAt: "14:30",
    },
    {
      user: { _id: 2 },
      name: "suzi",
      message: "안녕하세요!",
      createdAt: "14:30",
    },
    {
      user: { _id: 2 },
      name: "suzi",
      message: "ㄹㅇㄴ멀ㄴㅁ이ㅏ;런ㅁ이라ㅓ니마ㅓㄹㅁ니아런 \n fdsa;lkfjadls;fkjsadl;",
      createdAt: "14:30",
    },
  ];
  const id = 2;
  const test = { user: { id: 1 } };
  return (
    <S.ChatMessageLayout>
      {chatMessages.map((chatMessage, i) =>
        chatMessage.user?._id === test?.user.id ? (
          <S.Chatting flexdirection="row-reverse" key={"_msg" + i}>
            <S.SendMessageInfoBox>
              <S.SendMessageBox>
                <span>{chatMessage.message}</span>
              </S.SendMessageBox>
              <S.TimeBox textalign="right" right="100%" left="auto">
                <span>{chatMessage.createdAt}</span>
              </S.TimeBox>
            </S.SendMessageInfoBox>
          </S.Chatting>
        ) : (
          <S.Chatting flexdirection="row" key={"_msg" + i}>
            <S.ChatContent>
              <S.ProfileImgBox>
                <img src={""} alt={"사진"} />
              </S.ProfileImgBox>
              <S.MessageInfoBox>
                <S.NameBox>
                  <span>{`${chatMessage.name}`}</span>
                </S.NameBox>
                <S.MessageBox>
                  <p>{chatMessage.message}</p>
                </S.MessageBox>
                <S.TimeBox textalign="left" left="100%" right="">
                  <span>{chatMessage.createdAt}</span>
                </S.TimeBox>
              </S.MessageInfoBox>
            </S.ChatContent>
          </S.Chatting>
        )
      )}
    </S.ChatMessageLayout>
  );
};

export default Message;
