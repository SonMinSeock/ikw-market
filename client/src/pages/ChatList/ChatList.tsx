import { useEffect, useState } from "react";
import * as S from "./ChatList.style";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/login/atoms";
const ChatList = () => {
  // const user = useRecoilValue(userAtom);
  // const [chatRoom, setChatRoom] = useState([]);

  // const getChatRoomAPI = async () => {
  //   const { chatRoom } = await (
  //     await axios.get(`http://localhost:3002/chats/${user._id}`, { withCredentials: true })
  //   ).data;
  //   setChatRoom(chatRoom);
  // };
  // useEffect(() => {
  //   getChatRoomAPI();
  // }, []);

  // console.log(chatRoom);

  return (
    <S.ChatListLayout>
      <S.ChatListTitle>대화 목록</S.ChatListTitle>
      <S.ChatList>
        <S.ChatListItem>
          <S.ChatListProfileImg src="https://avatars.githubusercontent.com/u/102671646?v=4" />
          <S.ChatListInfoBox>
            <S.ChatListUserName>박해준</S.ChatListUserName>
            <S.ChatListMessages>여기에 최근 메시지</S.ChatListMessages>
          </S.ChatListInfoBox>
          <S.ChatListTime>오전 7:40</S.ChatListTime>
        </S.ChatListItem>
      </S.ChatList>
    </S.ChatListLayout>
  );
};

export default ChatList;
