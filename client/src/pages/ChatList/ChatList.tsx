import { useEffect, useState } from "react";
import * as S from "./ChatList.style";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/login/atoms";
const ChatList = () => {
  const user = useRecoilValue<any>(userAtom);
  const navigate = useNavigate();

  const onRedirectProductEdit = (chat: any) => {
    return navigate(`../chat/${chat._id}`, { state: chat });
  };

  // 상대방의 이미지, 닉네임 반환 해주는 함수
  const showProfileImgAndNickname = (chat: any): any => {
    let show;
    chat?.member_list.forEach((userInfo: any) => {
      if (userInfo._id !== user._id) {
        show = [userInfo.profile_image, userInfo.nickname];
      }
    });

    return show;
  };

  return (
    <S.ChatListLayout>
      <S.ChatListTitle>대화 목록</S.ChatListTitle>
      <S.ChatList>
        {user?.chat_room.map((chat: any) => (
          <S.ChatListItem onClick={() => onRedirectProductEdit(chat)} key={chat._id}>
            <S.ChatListProfileImg src={showProfileImgAndNickname(chat)[0]} alt="사진" />
            <S.ChatListInfoBox>
              <S.ChatListUserName>{showProfileImgAndNickname(chat)[1]}</S.ChatListUserName>
              <S.ChatListMessages>{chat?.message_log[chat?.message_log.length - 1]?.message}</S.ChatListMessages>
            </S.ChatListInfoBox>
            <S.ChatListTime>{chat?.message_log[chat?.message_log.length - 1]?.send_date}</S.ChatListTime>
          </S.ChatListItem>
        ))}
      </S.ChatList>
    </S.ChatListLayout>
  );
};

export default ChatList;
